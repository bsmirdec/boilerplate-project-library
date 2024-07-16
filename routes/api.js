/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const Book = require("../models/books");
const Comment = require("../models/comments");

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async (req, res) => {
      try {
        const books = await Book.find().lean();

        books.forEach((book) => {
          book["commentcount"] = book.comments.length;
        });

        return res.json(books);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
      }
    })

    .post(async (req, res) => {
      let title = req.body.title;
      if (!title) {
        return res.send("missing required field title");
      }

      const newBook = await new Book({ title });
      newBook
        .save()
        .then((book) => {
          res.json({ title: book.title, _id: book._id });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })

    .delete(function (req, res) {
      //if successful response will be 'complete delete successful'
    });

  app
    .route("/api/books/:id")
    .get(async (req, res) => {
      let bookid = req.params.id;
      if (!bookid) {
        return res.send("missing required field comment");
      }
      try {
        const book = await Book.findById(bookid);
        if (!book) {
          return res.send("no book exists");
        }
        return res.json(book);
      } catch (err) {
        return res.send("no book exists");
      }
    })

    .post(function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get
    })

    .delete(function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
    });
};
