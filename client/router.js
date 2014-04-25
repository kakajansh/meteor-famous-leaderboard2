// // ------------------ routing -------------------

Router.configure({
  loadingTemplate: 'loading'
})

Router.onBeforeAction('loading');

Router.map(function () {
  this.route('home', {
    path: '/',
    template: 'home',
    onBeforeAction: function () {
      myHome = Application.section('home')
      Application.select('home')
    }
  });

  this.route('leader', {
      path: '/leader',
      template: 'leader',
      waitOn: function () {
        return Meteor.subscribe('players');
      },
      onBeforeAction: function () {
        myLeader = Application.section('leader');
        Application.select('leader');
      }
  });

  this.route('about', {
      path: '/about',
      template: 'about',
      onBeforeAction: function () {
        myAbout = Application.section('about');
        Application.select('about');
      }
    });

  this.route('detail', {
      path: '/detail',
      template: 'detail',
      onBeforeAction: function () {
        myDetail = Application.section('detail');
        Application.select('detail');
      }
  });
});

