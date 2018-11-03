import express from 'express'
import jwt from 'jsonwebtoken'
import eJWT from 'express-jwt'

import { AuthUserToken } from '../JWTprotectionMiddleware'

const router = express.Router()

const Item = class {
	constructor(id, itemName, info, lender) {
		this.id =  id
		this.itemName = itemName
		this.info = info
		this.lender = lender
		this.borrower = null
		this.requestsForItem = []
		this.isAvailable = true
	}
	addNewRequest(user) {
		this.requestsForItem.push(user)
	}
	removeRequest(user) {
		this.removeRequest.filter(us => user.name !== us.name)
	}
	lendItTo(user) {
		this.borrower = user.name
	}
	removeBorrower(){
		this.borrower = null
	} 
}


const id = 0

const User = class {
    constructor(name) {
        this.name = name
        this.ListOfItemsBorrowed = []
        this.ListOfItemsYouLend = []
    }
    addItemToYourLendList(item) {
        this.ListOfItemsYouLend.push(item)
    }
    addItemToYourBorrowedList(item, lender) {
        item.isAvailable = false
        item.lender = lender
        item.borrower = this.name
        this.ListOfItemsBorrowed.push(item)
    }
}





const Users = [new User("Viktor"), new User("Brian")]


const Items = [
    new Item(0,"Hammer","A good hammer for hitting nails","Brain"),
    new Item(1,"Car","nasty old car","Brain"),
    new Item(2,"vacuumcleaner","You can clean ur house with it","Brain")
]


router.all('/', (req, res, next) => {
	const token = req.headers.token,
		token_verified = jwt.verify(token, 'test123', (err, decoded) => {
			if(err) console.log(err);
		})

	res.json({ 
		message: 'UserApi',
		token: token_verified
	})
	res.end()
})


router.post('/create', AuthUserToken, (req, res, next) => {
	res.cookie('user', 'viktor')
	res.json({ 
		test: '123',
		data: req.decodedToken
	})
})



export default router;