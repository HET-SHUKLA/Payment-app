import express from 'express';
import { PrismaClient as db1 } from '@repo/db-bank1/client';
import { PrismaClient as db2 } from '@repo/db-bank2/client';
import { PrismaClient as db3 } from '@repo/db-bank3/client';

const app = express();

app.use(express.urlencoded({ extended: false }));

//Decimal Scale
const DECIMAL_SCALE = 2;

//Webhook for dummy bank 1
app.post('/webhook-dummy-1', async (req, res) : Promise<any> => {
    const paymentInfo = {
        amount: req.body.amount, //Must be a BigInt
        senderAccountNumber: req.body.senderAccountNumber,
        receiverAccountNumber: req.body.receiverAccountNumber,
        receiverBankCode: req.body.receiverBankCode,
        secret: req.body.secret //Just because this is dummy bank, Otherwise it should be in headers
    }

    //Checks whether webhook request is from authentic sources
    if(paymentInfo.secret != process.env.DUMMY_BANK_WEBHOOK_1_SECRET) {
        return res.status(401).json({ message: 'Unauthorized' });
    }


    //Check if the sender account has enough balance
    const db = new db1();

    //TODO: migrate database first, It is giving errors.

    // const balance = await db.user.findFirst({
    //     where: {
    //         accountNumber: paymentInfo.senderAccountNumber
    //     },
    //     select: {
    //         balance: true
    //     }
    // });


    // const finalSendingAmount = (paymentInfo.amount)*(10**DECIMAL_SCALE);
    // if(balance.balance < finalSendingAmount) {
    //     return res.status(400).json({ message: 'Insufficient Balance' });
    // }

    // //Update the balance of sender
    // await db.user.update({
    //     where: {
    //         accountNumber: paymentInfo.senderAccountNumber
    //     },
    //     data: {
    //         balance: {
    //             decrement: paymentInfo.amount
    //         }
    //     }
    // });



    
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});