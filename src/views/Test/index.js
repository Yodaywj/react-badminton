import { useState } from "react";

export default function Test() {
    const [oldArray, setOldArray] = useState([{1:2}, {2:4}, {3:6}]);
    const [newArray, setNewArray] = useState([{1:2}, {2:4}, {3:6}, {4:8}]);

    // 在这里使用 filter() 方法和 includes() 方法比较新旧两个数组，并将新数组中新增的数据筛选出来
    const handleButtonClick = () => {
        const addedItems = newArray.filter((item) => !oldArray.includes(item));
        console.log(addedItems); // 打印出新数组中新增的数据
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Compare Arrays</button>
            <p>Old Array: {JSON.stringify(oldArray)}</p>
            <p>New Array: {JSON.stringify(newArray)}</p>
        </div>
    );
}