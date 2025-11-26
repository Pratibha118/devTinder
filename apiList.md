## authRouter

Post - /signup
Post - /login
Post - /logout

## profileRouter

Get - /profile/view
Patch - /profile/update
Patch - /profile/pass

## userRouter

Get - /user/feed
Get - /user/received/requests
Get - /user/requests
Get - /user/connections

## connectionRequestRouter

Post - /request/send/:status/:userId
Post - /request/review/:status/:requestID