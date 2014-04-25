// // Observes changes on a cursor and updates the data array inplace
cursorToArray = function(cursor, data, createFn) {
  cursor.observe({
    addedAt: function(document, atIndex, before) {
      data.splice(atIndex, 0, createFn(document));
    },
    changedAt: function(newDocument, oldDocument, atIndex) {
      data.splice(atIndex, 1, createFn(newDocument))
    },
    removedAt: function(oldDocument, atIndex) {
      data.splice(atIndex, 1);
    },
    movedTo: function(document, fromIndex, toIndex, before) {
      var item = data.splice(fromIndex, 1)[0];
      data.splice(toIndex, 0, item);
    }
  });
}

Players = new Meteor.Collection("players");

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
  Meteor.startup(function () {
    if (Players.find().count() === 0) {
      var names = ["Ada Lovelace",
                   "Grace Hopper",
                   "Marie Curie",
                   "Carl Friedrich Gauss",
                   "Nikola Tesla",
                   "Claude Shannon",
                   "Isaac Newton",
                   "Michael Faraday",
                   "Charles Darwin",
                   "Max Planck",
                   "Gregor Mandel",
                   "Thomas Edison"];
      for (var i = 0; i < names.length; i++)
        Players.insert({name: names[i], score: Math.floor(Random.fraction()*10)*5});
    }
  });

  Meteor.publish("players", function () {
    return Players.find({ });
  })
}