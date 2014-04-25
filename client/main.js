Template.home.rendered = function () {
  var surface = new Surface({
    size:[150,150],
    properties: { 
      lineHeight: "100px",
      textAlign: "center", 
      backgroundColor: 'orange'
    }
  });

  var surface2 = new Surface({
    size:[150,150],
    properties: { 
      lineHeight: "100px",
      textAlign: "center", 
        backgroundColor: 'green'
    }
  });

  var surface3 = new ImageSurface({
    size: [100, 100],
    content: '/logo.png'
  })

  var modifier = new Modifier({
    origin: [.5,.5],
    transform: Transform.rotate(0,0,Math.PI)
  });

  var modifier2 = new Modifier({
    origin: [.5,.5],
    transform: Transform.rotate(0,0,0)
  });

  var modifier3 = new Modifier({
      origin: [.5,.5],
  });

  var transition = {
    method: 'spring',
    period: 10000,
    curve: "easeInOut",
    dampingRatio: 0,
    velocity: 0
  }

  Transitionable.registerMethod('spring', SpringTransition);

  modifier.setTransform(Transform.rotate(0,0,0), transition);    
  modifier2.setTransform(Transform.rotate(0,0,Math.PI), transition);    

  myHome.add(modifier).add(surface);
  myHome.add(modifier2).add(surface2);
  myHome.add(modifier3).add(surface3);
};

Template.leader.rendered = function () {
  var scrollview = new Scrollview();
  var modify = new StateModifier();
  var surfaces = [];


  scrollview.sequenceFrom(new MeteorSequence({
    template: Template.player,
    data: Players.find({}, {sort: {score:-1, name:1}}),
    size: [undefined, 100],
    classes: ['listItem'],
    properties: {
      'padding-left': '20px'
    }
  }));


  _.each(scrollview._node._.array, function(node) {
    node.on('click', function () {
      modify.setOpacity(.8, {duration : 500})
      modify.setOrigin([1,.5], {duration: 500})
    })
  })

  myLeader.pipe(scrollview)

  var surf = new MeteorSurface({
    size: [150, 150],
    template: Template.surf,
    properties: {
      backgroundColor: '#b7af4c',
      lineHeight: '70px',
      textAlign: 'center'
    }
  })

  modify = new StateModifier({
    origin: [1,0],
    opacity: .1
  })

  myLeader.add(modify).add(surf)
  myLeader.add(scrollview)

};


Template.about.rendered = function () {
  modifier = new Modifier({
    origin: [.5,.5]
  })

  var about = new MeteorSurface({
    size: [300, 300],
    template: Template.about,
    content: "<h1>About page</h1>",
    properties: {
      backgroundColor: '#b7af4c'
    }
  })

  myAbout.add(modifier).add(about)

};

Template.surf.selected_player = function () {
  var player = Players.findOne(Session.get("selected_player"));
  return player;
};

Template.player.selected = function () {
  return Session.equals("selected_player", this._id) ? "selected" : '';
};

Template.surf.events({
  'click input.inc': function () {
    console.log(Session.get("selected_player"))
    Players.update(Session.get("selected_player"), {$inc: {score: 5}});
  }
});

Template.player.events({
  'click': function () {
    Session.set("selected_player", this._id);
  }
});