import React from 'react'

class Listings extends React.Component<{},{}> {
render() {
    return (
        <div>
            <p>results</p>
        </div>
    )
}
} export default Listings


const mockData = [
    {
        title: 'title here',
        subtitle: 'subtitle here',
        beds: '6',
        bath: '3',
        cost: '5000',
        sqft: '345',
        src: 'www.facebook.com/marketplace'
    }
]