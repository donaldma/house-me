import puppeteer from 'puppeteer'
import _ from 'lodash'
import { IListingEntity, IFetchedListing, IListingDetails, FullListingDetails } from '../models/Listing'
import { ListingRepository } from '../repositories/ListingRepository'

class ListingService {
  async getAll(): Promise<IListingEntity[]> {
    const cachedListings = await ListingRepository.getAll()
    if (cachedListings.length > 0) {
      return cachedListings
    }

    const fetchedListings = await this.fetch()
    const createPromises = fetchedListings.map((listing) => ListingRepository.create(listing))
    await Promise.all(createPromises)

    return _.sortBy(await ListingRepository.getAll(), 'id')
  }

  async getById(listingId: number): Promise<FullListingDetails> {
    const listing = await ListingRepository.getById(listingId)
    const details = await this.fetchDetails(listing.listingUrl)

    return {
      ...listing,
      ...details
    }
  }

  async fetch(): Promise<IFetchedListing[]> {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.goto('https://vancouver.craigslist.org/search/rch/apa?hasPic=1')
    const listings = await page.evaluate(() => {
      const toTitleCase = (str: string) =>
        str
          .toLowerCase()
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ')

      const results: IFetchedListing[] = []
      const items = document.querySelectorAll('li.result-row')
      items.forEach((item, index) => {
        const titleQuery = <HTMLElement>item.querySelector('a.result-title')
        const title = titleQuery.innerText

        const locationQuery = <HTMLElement>item.querySelector('span.result-hood')
        const location = locationQuery && toTitleCase(locationQuery.innerText.replace(/[()]/g, ''))

        const priceQuery = <HTMLElement>item.querySelector('span.result-price')
        const price = priceQuery.innerText

        const housingInfoQuery = <HTMLElement>item.querySelector('span.housing')
        const housingInfo = housingInfoQuery && housingInfoQuery.innerText.replace(/\s/g, '').split('-')

        const bedsQuery = housingInfo && housingInfo.find((info) => info.includes('br'))
        const beds = bedsQuery ? parseInt(bedsQuery.replace('br', '')) : null

        const sqftQuery = housingInfo && housingInfo.find((info) => info.includes('ft2'))
        const sqft = sqftQuery ? parseInt(sqftQuery.replace('ft2', '')) : null

        const listingUrl = item.querySelector('a.result-image').getAttribute('href')

        const imageUrl = item.querySelector('img').getAttribute('src')

        results.push({
          title,
          location,
          price,
          beds,
          sqft,
          listingUrl,
          imageUrl
        })
      })
      return results
    })
    browser.close()
    return listings
  }

  async fetchDetails(listingUrl: string): Promise<IListingDetails> {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
    const page = await browser.newPage()
    await page.goto(listingUrl)

    const details = await page.evaluate(() => {
      const tags: string[] = []
      document.querySelectorAll('p.attrgroup span').forEach((t, index) => {
        const tagQuery = <HTMLElement>t
        const tag = tagQuery.innerText

        tags.push(tag)
      })
      const bedBathQuery = tags.find(
        (tag) => tag.toLowerCase().includes('br') || tag.toLowerCase().includes('ba')
      )
      const bathsQuery = bedBathQuery && bedBathQuery.split('/').find((bb) => bb.toLowerCase().includes('ba'))
      const baths = bathsQuery ? parseInt(bathsQuery.toLowerCase().replace('ba', '')) : null

      const filteredTags = tags.filter(
        (tag) =>
          !tag.toLowerCase().includes('br') &&
          !tag.toLowerCase().includes('ba') &&
          !tag.toLowerCase().includes('ft2')
      )

      const images: string[] = []
      document.querySelectorAll('a.thumb img').forEach((img, index) => {
        const image = img.getAttribute('src').replace('50x50c', '600x450')

        images.push(image)
      })

      const descriptionQuery = <HTMLElement>document.querySelector('#postingbody')
      const description = descriptionQuery.innerText

      return {
        baths,
        attributes: filteredTags,
        images,
        description
      }
    })
    browser.close()
    return details
  }
}

const ListingServiceInstance = new ListingService()
export { ListingServiceInstance as ListingService }
