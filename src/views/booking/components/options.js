const options = [];

// 生成小时选项
for (let hour = 0; hour <= 23; hour++) {
    const hourOption = {
        value: hour.toString(),
        label: hour.toString().padStart(2, '0') + '时',
        children: [],
    };

    for (let minute = 0; minute <= 59; minute++) {
        const minuteOption = {
            value: minute.toString(),
            label: minute.toString().padStart(2, '0') + '分',
        };

        hourOption.children.push(minuteOption);
    }

    options.push(hourOption);
}

export default options;