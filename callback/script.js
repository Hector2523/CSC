const loginUser = (email, senha, onSuccess, onError) => {
    setTimeout(() => {
        const error = true;

        if (error) {
            return onError(new Error('Error in login!'))
        }

        console.log('user logged!')
        onSuccess({ email })
    }, 1500)
}

const getUserDocuments = (email, callback) => {
    setTimeout(() => {
        callback(["documento1", "documento2", "documento3", "documento4", "documento5"])
    }, 1000)
}

const getDocumentName = (document, callback) => {
    setTimeout(() => {
        callback({name: "document name"})
    },1000)
}

const user = loginUser('heitor.fsilva1000@gmail.com', '123456',
    (user) => {
        console.log(user)
        getUserDocuments(user.email, (documents) => {
            console.log({ documents })

            getDocumentName(documents[0], (documentName) => {
                console.log({ documentName })
            })
        });
    }, 
    (error) => {
        console.log(error)
    }
)