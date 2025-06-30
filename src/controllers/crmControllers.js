import mongoose from "mongoose";
import { ContactSchema } from "../models/crmModel.js";

const Contact = mongoose.model("Contact", ContactSchema);

export const addNewContact = async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getContactWithID = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findOneAndUpdate(
      { _id: req.params.contactId },
      req.body,
      { new: true, runValidators: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const result = await Contact.deleteOne({ _id: req.params.contactId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Successfully deleted contact" });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
