import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel.js";

const Contact = mongoose.model("Contact", ContactSchema);

export const addNewContact = (req, res) => {
  const newContact = new Contact(req.body);

  newContact.save((err, contact) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json(contact);
  });
};

export const getContacts = (req, res) => {
  Contact.find({}, (err, contacts) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(200).json(contacts);
  });
};

export const getContactWithID = (req, res) => {
  Contact.findById(req.params.contactId, (err, contact) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  });
};

export const updateContact = (req, res) => {
  Contact.findOneAndUpdate(
    { _id: req.params.contactId },
    req.body,
    { new: true, runValidators: true },
    (err, contact) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!contact) {
        return res.status(404).json({ message: "Contact not found" });
      }
      res.status(200).json(contact);
    }
  );
};

export const deleteContact = (req, res) => {
  Contact.deleteOne({ _id: req.params.contactId }, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Successfully deleted contact" });
  });
};
