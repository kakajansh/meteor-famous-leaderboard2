require("famous-polyfills"); // Add polyfills
require("famous/core/famous"); // Add the default css file

Meteor.startup(function (){
    Engine              = require("famous/core/Engine");
    Surface             = require("famous/core/Surface");
    ImageSurface        = require("famous/surfaces/ImageSurface");
    View                = require("famous/core/View");
    Modifier            = require("famous/core/Modifier");
    StateModifier       = require("famous/modifiers/StateModifier");
    Transform           = require("famous/core/Transform");
    Scrollview          = require("famous/views/Scrollview");
    RenderController    = require("famous/views/RenderController");
    HeaderFooterLayout  = require("famous/views/HeaderFooterLayout");
    Timer               = require("famous/utilities/Timer");
    Transitionable      = require("famous/transitions/Transitionable");
    // TitleBar            = require("famous/widgets/TitleBar");
    EdgeSwapper         = require("famous/views/EdgeSwapper");
    Utility             = require("famous/utilities/Utility");
    NavigationBar       = require("famous/widgets/NavigationBar");
    OptionsManager      = require("famous/core/OptionsManager");
    EventHandler        = require("famous/core/EventHandler");
    RenderNode          = require("famous/core/RenderNode");
    TweenTransition     = require("famous/transitions/TweenTransition");
    GridLayout          = require("famous/views/GridLayout");
    Lightbox            = require("famous/views/Lightbox");
    ContainerSurface    = require("famous/surfaces/ContainerSurface");
    FastClick           = require("famous/inputs/FastClick");
    SpringTransition    = require("famous/transitions/SpringTransition");
    SnapTransition      = require("famous/transitions/SnapTransition");
    TweenTransition     = require("famous/transitions/TweenTransition");

    // ViewSequence        = require("famous/core/ViewSequence");
    ReactiveEntity      = require("library/meteor/core/ReactiveEntity");
    PageView            = require("library/meteor/core/PageView");
    MeteorSurface       = require("library/meteor/core/Surface");
    MeteorSequence      = require("library/meteor/core/ViewSequence");


    function App() {
      // extend from view
      View.apply(this, arguments);

      this.contentArea = new EdgeSwapper()

      this.layout = new HeaderFooterLayout({
        header: 0,
        footer: 50
      })

      this.layout.footer.add(new MeteorSurface({
        template: Template.footer,
        size: [undefined, 50],
        // content: '<h1>hello</h1>'
      }))

      this.layout.content.add(this.contentArea)

      this._currentSection = undefined;
      this._sections = {};

      this.add(this.layout)
    }

    App.prototype = Object.create(View.prototype);
    App.prototype.constructor = App;

    App.prototype.getState = function () {
      return this._currentSection;
    }

    App.prototype.section = function (name, template, data) {
      if(!(name in this._sections)) {
        this._sections[name] = new RenderNode();
      }

      this._sections[name] = new ContainerSurface({
        size: [undefined, undefined],
        properties: {
          overflow: 'hidden',
          backgroundColor: 'white'
        }
      })

      return this._sections[name]
    }


    App.prototype.select = function (pageName) {
      this._currentSection = pageName;
      if(!(pageName in this._sections)) return false;

      var surface = this._sections[pageName];
      if (surface) {
        this.contentArea.show(surface);
      }
    }

    Application = new App();

    mainContext = Engine.createContext($('.main')[0]);
    mainContext.add(Application);
    Engine.pipe(Application);
});
