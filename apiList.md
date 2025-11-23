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
Get - /user/pending/send/requests
Get - /user/connections

## connectionRequestRouter

Post - /request/send/interested/:userId
Post - /request/send/ignored/:userId
Post - /request/review/accepted/:requestID
Post - /request/review/rejected/:requestID