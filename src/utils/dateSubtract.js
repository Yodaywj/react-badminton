const dateSubtract = (time)=> {
    let [datePart, timePart] = time.split(' ');

    let [year, month, day] = datePart.split('-');

    let [hour, minute, second] = timePart.split(':');

    let date = new Date(year, month - 1, day, hour, minute, second);

    let now = new Date();

    let diff = date.getTime() - now.getTime();

    if (diff < -1000) {
        diff = 0;
    }

    return Date.now()+diff;
}

export default dateSubtract;