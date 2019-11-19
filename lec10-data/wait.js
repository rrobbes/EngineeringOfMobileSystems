
const wait = s => new Promise(resolve => setTimeout(resolve, s * 1000));

const crash = () => {
    throw new Error("crash!")
}

const parallel = () => {
    wait(4).then(() => console.log("waited 4 sec!"));
    wait(2).then(() => console.log("waited 2 sec!"));
    wait(1).then(() => console.log("waited 1 sec!"));
    wait(3).then(() => console.log("waited 3 sec!"));
    wait(5).then(() => console.log("waited 5 sec!"));
}

const sequence = () => {
    wait(3)
        .then(() => console.log("waited 3 sec!"))
        .then(() => wait(2))
        .then(() => console.log("waited 2 sec!"))
        .then(() => wait(1))
        .then(() => console.log("waited 1 sec!"))
}

const withError = () => {
    wait(1)
        .then(crash)
        .then(() => console.log("waited 1 sec!"))
        .catch(() => console.log("ooops!!"))
        .then(() => console.log("did we recover?"))
}

const withRecovery = () => {
    wait(1)
        .then(crash)
        .then(() => console.log("waited 1 sec!"))
        .catch(() => console.log("ooops!!"))
        .then(() => wait(1))
        .then(() => console.log("did we recover?"))
        .catch(() => console.log("oh no!"))
}

const waitReturn = s => wait(s).then(() => `waited ${s} seconds`)

const withArguments = () => {
    waitReturn(1).then(res => console.log(res))
}

const waitPrint = s => waitReturn(s).then(console.log)

const dontWaitForAll = () => {
    const w1 = waitPrint(1)
    const w2 = waitPrint(2)
    const w3 = waitPrint(3)
    const w4 = waitPrint(4)
    console.log("all done here!")
}

const waitForAll = () => {
    const w1 = waitPrint(1)
    const w2 = waitPrint(2)
    const w3 = waitPrint(3)
    const w4 = waitPrint(4)
    const all = Promise.all([w1,w2,w3,w4])
    all.then(() => console.log("all done here!"))
}

const promiseRace = () => {
    const w1 = waitReturn(1)
    const w2 = waitReturn(2)
    const w3 = waitReturn(3)
    const w4 = waitReturn(4)
    const race = Promise.race([w1,w2,w3,w4])
    race.then(winner => console.log("and the winner is ... " + winner))
}

console.log("ready to wait?")
//parallel()
//sequence()
//withError()
//withRecovery()
//withArguments()
//dontWaitForAll()
// waitForAll()
// promiseRace()

const withAwait = async () => {
    const w1 = await waitReturn(1)
    console.log(w1)
    const w2 = await waitReturn(2)
    console.log(w2)
}


const withAwait2 = async () => {
    const w1 = waitReturn(1)
    const w2 = waitReturn(2)
    console.log(await w1)
    console.log(await w2)
}


const withAwait3 = async () => {
    const w1 = waitReturn(1)
    const w2 = waitReturn(2)
    console.log(await w2)
    console.log(await w1)
}

const awaitError = async () => {
    try {
        const w1 = await waitReturn(1)
        console.log(w1)
        const oops = await crash()
        console.log(oops)
        const w2 = await waitReturn(2)
        console.log(w2)
    } catch(error) {
        console.log("something happened: " + error.message)
    }
    
}

const notBlocking = () => {
    return waitReturn(3)
}

const isAsync = async () => {
    const result = notBlocking()
    console.log(await result)
}

const notBackToSync = () => {
    isAsync()
    console.log("isAsync() returned")
}

//withAwait()
//withAwait2()
//withAwait3()
//awaitError()
//isAsync()

notBackToSync()
