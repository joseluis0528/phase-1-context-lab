/* Your Code Here */

function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(array) {
    return array.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent(dateStamp) {
    const timeAndDate = dateStamp.split(' ');
    const newEvent = {
        type: 'TimeIn',
        hour: parseInt(timeAndDate[1]),
        date: timeAndDate[0]
    }
    this.timeInEvents.push(newEvent);
    return this;
}

function createTimeOutEvent(dateStamp) {
    const timeAndDate = dateStamp.split(' ');
    const newEvent = {
        type: 'TimeOut',
        hour: parseInt(timeAndDate[1]),
        date: timeAndDate[0]
    }
    this.timeOutEvents.push(newEvent);
    return this;
}

function hoursWorkedOnDate(date) {
    const clockedIn = this.timeInEvents.find(record => record.date === date);
    const clockedOut = this.timeOutEvents.find(record => record.date === date);
    return parseInt(clockedOut.hour * 0.01) - parseInt(clockedIn.hour * 0.01);
}

function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const pay = this.payPerHour;
    return hoursWorked * pay;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(employeeRecords, employeeFirstName) {
    const employee = employeeRecords.find(name => name.firstName === employeeFirstName);
    return employee;
}

function calculatePayroll(employeeRecords) {
    const allWages = employeeRecords.map(employee => allWagesFor.call(employee));
    const totalWages = allWages.reduce((memo, employee) => {
        return memo + employee;
    }, 0)
    return totalWages;
}