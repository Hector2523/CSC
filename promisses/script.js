const loginUser = (email, password) => {
    return new Promise((resolve, reject) => {
        const error = false;

        if (error) {
            return reject(new Error("Error in login :("))
        }

        console.log("User logged :)")
        resolve({ email })
    })
}

const getUserDocuments = (email) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("getUserDocuments")
            resolve(["documento1", "documento2", "documento3", "documento4", "documento5"])
        }, 1000)
    })
}

const getDocumentName = (document) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("getDocumentName")
            resolve({name: "document name :)"})
        }, 1000)
    })
}

loginUser("heitor.fsilva1000@gmail.com", "123456").then((user) => { getUserDocuments(user.email).then((documents) => { getDocumentName(documents[0])}) }).catch((error) => { console.log({ error })})

const googleDocs = new Promise((resolve, reject) => {
    console.log("docs from google")
    resolve("docs from google")
})

const wordDocs = new Promise((resolve, reject) => {
    console.log("docs from Word")
    resolve("docs from Word")
})

Promise.all([googleDocs, wordDocs]).then((result) => {
    console.log(result)
})