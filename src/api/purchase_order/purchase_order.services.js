import AppError from '../../util/error'
import { PurchaseOrder,PurchaseOrderItem } from './purchase_order.model'

export const getPurchaseOrder_byId  = async (id) => {
  try {
    const doc = await PurchaseOrder.findOne({ _id: id }).lean().exec()

    if (!doc) {
    throw new AppError("No Data found",406)
    }

    return doc
  } catch (e) {
    throw AppError(e.message)
  }
}

export const getPurchaseOrder = (limit=20) => {
  try {
    const docs = await model.find().sort({_id: -1})
    .limit(limit).lean().exec()

    return docs
  } catch (e) {
    console.error(e.message)
    throw new AppError(e.message)
  }
}

export const createPurchaseorder = async (req, res, next) => {
  const createdBy = req.user._id
  try {
    const doc = await model.create({ ...req.body, createdBy })
    res.status(201).json({ data: doc })
  } catch (e) {
    console.error(e.message)
    if (e.message.includes('duplicate')) {
      next(
        new AppError(
          `the values ${Object.values(
            e.keyValue
          )} already exist at ${Object.keys(e.keyValue)}`,
          406
        )
      )
    }
    if (e.message) {
      next(new AppError(e.message, 406))
    }
    res.status(400).end()
  }
}

export const updateOne = (model) => async (req, res) => {
  try {
    const updatedDoc = await model
      .findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body,
        { new: true }
      )
      .lean()
      .exec()

    if (!updatedDoc) {
      return res.status(400).end()
    }

    res.status(200).json({ data: updatedDoc })
  } catch (e) {
    console.error(e)
    res.status(400).end()
  }
}

export const deletePurchaseOrder  = async (id) => {
  try {
    const removedPurcshaseOrder = await PurchaseOrder.findOneAndRemove({
      _id: id,
    })

    if (!removed) {
      throw new AppError(`${req.params.id} does not exit`,406)
    }
    const removedPurcshaseOrderItem = await PurchaseOrderItem.deleteMany({
        purchase_order: id,
    })
    return {removedPurcshaseOrder,removedPurcshaseOrderItem }
  } catch (e) {
    console.error(e)
    throw new AppError(e.message)
  }
}
