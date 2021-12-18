import AppError from '../../util/error'
import { PurchaseOrder } from './purchase_order.model'

export const createPurchaseorderService = async (body) => {
  const doc = await PurchaseOrder.create(body)
}

export const invoicePurchaseorderService = async (id,amount) => {
  const doc = await PurchaseOrder.findOneAndUpdate(
    {
      _id: id,
    },
    {status:"invoiced",
    total_value_paid:amount},
    { new: true }
  )
  .lean()
  .exec()
}
