import { useContext, useEffect } from "react"
import { FoodDataContext } from './FoodDataContext';


export default function FoodExperienceStat() {
    const { foodItems, numerator, percentage, updateFoodExperience } = useContext(FoodDataContext);

    useEffect(() => {
        updateFoodExperience();
    }, [foodItems]); // Only on mount and unmount
    // console.log('Component mounted')

    return (
        <>
            <div id="foodExperiencePercentage">
                <p id="foodExperienceStat">{ `You have ${numerator} different countr${numerator > 1 ? 'ies' : 'y'} which is ${percentage}% of the world`}</p>
            </div>
        </>
    )
}