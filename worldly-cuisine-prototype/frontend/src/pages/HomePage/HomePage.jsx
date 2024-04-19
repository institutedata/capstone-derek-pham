import FoodForm from "./components/FoodForm"
import MapBox from "./components/MapBox"
import FoodList from "./components/FoodList"
import Nav from "./components/Nav"
import FoodExperienceStat from "./components/FoodExperienceStat"
import BarChart from "./components/BarChart"
import ProgressBar from "./components/ProgressBar/ProgressBar"
import StarryBackground from "./components/StarryBackground"
import { DataProvider } from "./components/FoodDataContext"
import './HomePage.css'
import './responsive-css/responsive.css'

export default function HomePage() {
    return (
        <>
            <Nav />
            <StarryBackground/>
            <DataProvider>
                <FoodForm />
                <MapBox />
                <FoodList />
                <ProgressBar/>
                <FoodExperienceStat />
                <BarChart />
            </DataProvider>
        </>
    )
}