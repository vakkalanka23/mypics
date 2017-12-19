define('app',['exports', 'aurelia-auth'], function (exports, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.addPipelineStep('authorize', _aureliaAuth.AuthorizeStep);
      config.map([{
        route: ['', 'home'],
        moduleId: './modules/home',
        name: 'Home'
      }, {
        route: 'pic',
        moduleId: './modules/pic',
        name: 'pic',
        auth: false
      }, { route: 'list',
        moduleId: './modules/list',
        name: 'List',
        auth: true
      }]);
    };

    return App;
  }();
});
define('auth-config',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var authConfig = {
        baseUrl: "http://localhost:5000/api",
        loginUrl: '/users/login',
        tokenName: 'token',
        authHeader: 'Authorization',
        authToken: '',
        logoutRedirect: '#/home'
    };

    exports.default = authConfig;
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment', 'regenerator-runtime', './auth-config'], function (exports, _environment, _regeneratorRuntime, _authConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  var _regeneratorRuntime2 = _interopRequireDefault(_regeneratorRuntime);

  var _authConfig2 = _interopRequireDefault(_authConfig);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  window.regeneratorRuntime = _regeneratorRuntime2.default;

  function configure(aurelia) {
    aurelia.use.standardConfiguration().plugin('aurelia-auth', function (baseConfig) {
      baseConfig.configure(_authConfig2.default);
    }).feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/date-format', './value-converters/completed', './elements/flatpickr']);
  }
});
define('modules/home',['exports', 'aurelia-framework', 'aurelia-router', '../resources/data/users', 'aurelia-auth'], function (exports, _aureliaFramework, _aureliaRouter, _users, _aureliaAuth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _users.Users, _aureliaAuth.AuthService), _dec(_class = function () {
    function Home(router, users, auth) {
      _classCallCheck(this, Home);

      this.router = router;
      this.auth = auth;
      this.loginError = '';
      this.users = users;

      this.showLogin = true;
    }

    Home.prototype.showRegister = function showRegister() {
      this.user = {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      };
      this.registerError = "";

      this.showLogin = false;
    };

    Home.prototype.save = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var serverResponse;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(this.user);
                _context.next = 3;
                return this.users.save(this.user);

              case 3:
                serverResponse = _context.sent;

                if (!serverResponse.error) {
                  this.showLogin = true;
                } else {
                  this.registerError = "There was a problem registering the user.";
                }

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save() {
        return _ref.apply(this, arguments);
      }

      return save;
    }();

    Home.prototype.login = function login() {
      var _this = this;

      return this.auth.login(this.email, this.password).then(function (response) {
        sessionStorage.setItem("user", JSON.stringify(response.user));
        _this.loginError = "";
        _this.router.navigate('list');
      }).catch(function (error) {
        console.log(error);
        _this.loginError = "Invalid credentials.";
      });
    };

    return Home;
  }()) || _class);
});
define('modules/list',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-auth', '../resources/data/galleries'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaAuth, _galleries) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.List = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var List = exports.List = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _galleries.Galleries, _aureliaAuth.AuthService), _dec(_class = function () {
    function List(router, galleries, auth) {
      _classCallCheck(this, List);

      this.router = router;
      this.galleries = galleries;
      this.auth = auth;
      this.message = 'Galleries';
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.showList = true;
      this.showForm = false;
      this.editTodoForm = false;
      this.showCompleted = false;
    }

    List.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.galleries.getUserGalleries(this.user._id);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate() {
        return _ref.apply(this, arguments);
      }

      return activate;
    }();

    List.prototype.logout = function logout() {
      sessionStorage.removeItem('user');
      this.auth.logout();
    };

    List.prototype.createGallery = function createGallery() {
      this.galleryObj = {
        gallery: "",
        description: "",
        userId: this.user._id
      };
      this.showList = false;
      this.showForm = true;
    };

    List.prototype.saveGallery = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var response;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.galleryObj) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 3;
                return this.galleries.save(this.galleryObj);

              case 3:
                response = _context2.sent;

                if (response.error) {
                  alert("There was an error creating the Gallery");
                } else {}
                this.showList = true;
                this.showForm = false;

              case 7:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveGallery() {
        return _ref2.apply(this, arguments);
      }

      return saveGallery;
    }();

    List.prototype.back = function back() {
      this.showList = true;
      this.showForm = false;
    };

    List.prototype.editGallery = function editGallery(gallery) {
      this.galleryObj = gallery;
      this.showList = false;
      this.showForm = true;
    };

    List.prototype.checkGallery = function checkGallery(gallery) {
      sessionStorage.setItem("gallery", JSON.stringify(gallery));
      this.router.navigate('pic');
    };

    List.prototype.deleteGallery = function deleteGallery(gallery) {
      this.galleries.deleteGallery(gallery._id);
    };

    List.prototype.completeGallery = function completeGallery(gallery) {
      gallery.completed = !gallery.completed;
      this.galleryObj = gallery;
      this.saveGallery();
    };

    List.prototype.changeFiles = function changeFiles() {
      this.filesToUpload = new Array();
      this.filesToUpload.push(this.files[0]);
    };

    List.prototype.removeFile = function removeFile(index) {
      this.filesToUpload.splice(index, 1);
    };

    return List;
  }()) || _class);
});
define('modules/pic',['exports', 'aurelia-framework', 'aurelia-router', 'aurelia-auth', '../resources/data/pics'], function (exports, _aureliaFramework, _aureliaRouter, _aureliaAuth, _pics) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.pic = undefined;

  function _asyncToGenerator(fn) {
    return function () {
      var gen = fn.apply(this, arguments);
      return new Promise(function (resolve, reject) {
        function step(key, arg) {
          try {
            var info = gen[key](arg);
            var value = info.value;
          } catch (error) {
            reject(error);
            return;
          }

          if (info.done) {
            resolve(value);
          } else {
            return Promise.resolve(value).then(function (value) {
              step("next", value);
            }, function (err) {
              step("throw", err);
            });
          }
        }

        return step("next");
      });
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var pic = exports.pic = (_dec = (0, _aureliaFramework.inject)(_aureliaRouter.Router, _pics.pics, _aureliaAuth.AuthService), _dec(_class = function () {
    function pic(router, pics, auth) {
      _classCallCheck(this, pic);

      this.router = router;
      this.pics = pics;
      this.auth = auth;
      this.user = JSON.parse(sessionStorage.getItem('user'));
      this.showList = true;
      this.showForm = false;
      this.editTodoForm = false;
      this.showCompleted = false;
    }

    pic.prototype.activate = function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(gallery) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.pics.getGallerypics(JSON.parse(sessionStorage.getItem('gallery'))._id);

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function activate(_x) {
        return _ref.apply(this, arguments);
      }

      return activate;
    }();

    pic.prototype.createpic = function createpic() {
      this.picObj = {
        galleryId: JSON.parse(sessionStorage.getItem('gallery'))._id

      };
      this.showList = false;
      this.showForm = true;
    };

    pic.prototype.savepic = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var response, galleryId, picId;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!this.picObj) {
                  _context2.next = 16;
                  break;
                }

                _context2.next = 3;
                return this.pics.save(this.picObj);

              case 3:
                response = _context2.sent;

                if (!response.error) {
                  _context2.next = 8;
                  break;
                }

                alert("There was an error creating the pic");
                _context2.next = 14;
                break;

              case 8:
                galleryId = JSON.parse(sessionStorage.getItem('gallery'))._id;
                picId = response._id;

                if (!(this.filesToUpload && this.filesToUpload.length)) {
                  _context2.next = 14;
                  break;
                }

                _context2.next = 13;
                return this.pics.uploadFile(this.filesToUpload, galleryId, picId);

              case 13:
                this.filesToUpload = [];

              case 14:
                this.showList = true;
                this.showForm = false;

              case 16:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function savepic() {
        return _ref2.apply(this, arguments);
      }

      return savepic;
    }();

    pic.prototype.backToList = function backToList() {
      this.router.navigate('list');
    };

    pic.prototype.back = function back() {
      this.showList = true;
      this.showForm = false;
    };

    pic.prototype.editpic = function editpic(pic) {
      this.picObj = pic;
      this.showList = false;
      this.showForm = true;
    };

    pic.prototype.deletepic = function deletepic(pic) {
      this.pics.deletepic(pic._id);
    };

    pic.prototype.changeFiles = function changeFiles() {
      this.filesToUpload = new Array();
      this.filesToUpload.push(this.files[0]);
    };

    pic.prototype.removeFile = function removeFile(index) {
      this.filesToUpload.splice(index, 1);
    };

    pic.prototype.logout = function logout() {
      sessionStorage.removeItem('user');
      this.auth.logout();
    };

    return pic;
  }()) || _class);
});
define('resources/data/data-services',['exports', 'aurelia-framework', 'aurelia-fetch-client'], function (exports, _aureliaFramework, _aureliaFetchClient) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.DataServices = undefined;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var DataServices = exports.DataServices = (_dec = (0, _aureliaFramework.inject)(_aureliaFetchClient.HttpClient), _dec(_class = function () {
        function DataServices(http) {
            var _this = this;

            _classCallCheck(this, DataServices);

            this.httpClient = http;

            this.BASE_URL = "http://localhost:5000/api/";

            this.httpClient.configure(function (config) {
                config.withBaseUrl(_this.BASE_URL).withDefaults({
                    credentials: 'same-origin',
                    headers: {
                        'Accept': 'application/json',
                        'X-Requested-With': 'Fetch'
                    }
                }).withInterceptor({
                    request: function request(_request) {
                        console.log('Requesting ' + _request.method + ' ' + _request.url);
                        return _request;
                    },
                    response: function response(_response) {
                        console.log('Received ' + _response.status + ' ' + _response.url);
                        return _response;
                    }
                });
            });
        }

        DataServices.prototype.get = function get(url) {
            return this.httpClient.fetch(url).then(function (response) {
                return response.json();
            }).then(function (data) {
                return data;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.post = function post(content, url) {
            return this.httpClient.fetch(url, {
                method: 'post',
                body: (0, _aureliaFetchClient.json)(content)
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.put = function put(content, url) {
            return this.httpClient.fetch(url, {
                method: 'put',
                body: (0, _aureliaFetchClient.json)(content)
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.delete = function _delete(url) {
            return this.httpClient.fetch(url, {
                method: 'delete'
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        DataServices.prototype.uploadFiles = function uploadFiles(files, url) {
            return this.httpClient.fetch(url, {
                method: 'post',
                body: files
            }).then(function (response) {
                return response.json();
            }).then(function (object) {
                return object;
            }).catch(function (error) {
                return error;
            });
        };

        return DataServices;
    }()) || _class);
});
define('resources/data/galleries',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Galleries = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var Galleries = exports.Galleries = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
		function Galleries(data) {
			_classCallCheck(this, Galleries);

			this.data = data;
			this.GALLERY_SERVICE = 'galleries';
			this.galleriesArray = [];
		}

		Galleries.prototype.save = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(gallery) {
				var serverResponse, _serverResponse;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (!gallery) {
									_context.next = 13;
									break;
								}

								if (gallery._id) {
									_context.next = 9;
									break;
								}

								_context.next = 4;
								return this.data.post(gallery, this.GALLERY_SERVICE);

							case 4:
								serverResponse = _context.sent;

								if (!serverResponse.error) {
									this.galleriesArray.push(serverResponse);
								}
								return _context.abrupt('return', serverResponse);

							case 9:
								_context.next = 11;
								return this.data.put(gallery, this.GALLERY_SERVICE + "/" + gallery._id);

							case 11:
								_serverResponse = _context.sent;
								return _context.abrupt('return', _serverResponse);

							case 13:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function save(_x) {
				return _ref.apply(this, arguments);
			}

			return save;
		}();

		Galleries.prototype.getUserGalleries = function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
				var response;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return this.data.get(this.GALLERY_SERVICE + "/user/" + id);

							case 2:
								response = _context2.sent;

								if (!response.error && !response.message) {
									this.galleriesArray = response;
								}

							case 4:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getUserGalleries(_x2) {
				return _ref2.apply(this, arguments);
			}

			return getUserGalleries;
		}();

		Galleries.prototype.deleteGallery = function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(id) {
				var response, i;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								_context3.next = 2;
								return this.data.delete(this.GALLERY_SERVICE + "/" + id);

							case 2:
								response = _context3.sent;

								if (!response.error) {
									for (i = 0; i < this.galleriesArray.length; i++) {
										if (this.galleriesArray[i]._id === id) {
											this.galleriesArray.splice(i, 1);
										}
									}
								}

							case 4:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function deleteGallery(_x3) {
				return _ref3.apply(this, arguments);
			}

			return deleteGallery;
		}();

		return Galleries;
	}()) || _class);
});
define('resources/data/pics',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.pics = undefined;

	function _asyncToGenerator(fn) {
		return function () {
			var gen = fn.apply(this, arguments);
			return new Promise(function (resolve, reject) {
				function step(key, arg) {
					try {
						var info = gen[key](arg);
						var value = info.value;
					} catch (error) {
						reject(error);
						return;
					}

					if (info.done) {
						resolve(value);
					} else {
						return Promise.resolve(value).then(function (value) {
							step("next", value);
						}, function (err) {
							step("throw", err);
						});
					}
				}

				return step("next");
			});
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _dec, _class;

	var pics = exports.pics = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
		function pics(data) {
			_classCallCheck(this, pics);

			this.data = data;
			this.PIC_SERVICE = 'pics';
			this.picsArray = [];
		}

		pics.prototype.save = function () {
			var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(pic) {
				var serverResponse, _serverResponse;

				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (!pic) {
									_context.next = 13;
									break;
								}

								if (pic._id) {
									_context.next = 9;
									break;
								}

								_context.next = 4;
								return this.data.post(pic, this.PIC_SERVICE);

							case 4:
								serverResponse = _context.sent;

								if (!serverResponse.error) {
									this.picsArray.push(serverResponse);
								}
								return _context.abrupt('return', serverResponse);

							case 9:
								_context.next = 11;
								return this.data.put(pic, this.PIC_SERVICE + "/" + pic._id);

							case 11:
								_serverResponse = _context.sent;
								return _context.abrupt('return', _serverResponse);

							case 13:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function save(_x) {
				return _ref.apply(this, arguments);
			}

			return save;
		}();

		pics.prototype.getGallerypics = function () {
			var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(id) {
				var response;
				return regeneratorRuntime.wrap(function _callee2$(_context2) {
					while (1) {
						switch (_context2.prev = _context2.next) {
							case 0:
								_context2.next = 2;
								return this.data.get(this.PIC_SERVICE + "/gallery/" + id);

							case 2:
								response = _context2.sent;

								if (!response.error && !response.message) {
									this.picsArray = response;
								}

							case 4:
							case 'end':
								return _context2.stop();
						}
					}
				}, _callee2, this);
			}));

			function getGallerypics(_x2) {
				return _ref2.apply(this, arguments);
			}

			return getGallerypics;
		}();

		pics.prototype.uploadFile = function () {
			var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(files, galleryId, picId) {
				var formData, response;
				return regeneratorRuntime.wrap(function _callee3$(_context3) {
					while (1) {
						switch (_context3.prev = _context3.next) {
							case 0:
								formData = new FormData();

								files.forEach(function (item, index) {
									formData.append("file" + index, item);
								});

								_context3.next = 4;
								return this.data.uploadFiles(formData, this.PIC_SERVICE + "/upload/" + galleryId + "/" + picId);

							case 4:
								response = _context3.sent;

								console.log("this is being called " + this.PIC_SERVICE + "/upload/" + galleryId + "/" + picId);
								return _context3.abrupt('return', response);

							case 7:
							case 'end':
								return _context3.stop();
						}
					}
				}, _callee3, this);
			}));

			function uploadFile(_x3, _x4, _x5) {
				return _ref3.apply(this, arguments);
			}

			return uploadFile;
		}();

		pics.prototype.deletepic = function () {
			var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(id) {
				var response, i;
				return regeneratorRuntime.wrap(function _callee4$(_context4) {
					while (1) {
						switch (_context4.prev = _context4.next) {
							case 0:
								_context4.next = 2;
								return this.data.delete(this.PIC_SERVICE + "/" + id);

							case 2:
								response = _context4.sent;

								if (!response.error) {
									for (i = 0; i < this.picsArray.length; i++) {
										if (this.picsArray[i]._id === id) {
											this.picsArray.splice(i, 1);
										}
									}
								}

							case 4:
							case 'end':
								return _context4.stop();
						}
					}
				}, _callee4, this);
			}));

			function deletepic(_x6) {
				return _ref4.apply(this, arguments);
			}

			return deletepic;
		}();

		return pics;
	}()) || _class);
});
define('resources/data/users',['exports', 'aurelia-framework', './data-services'], function (exports, _aureliaFramework, _dataServices) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.Users = undefined;

    function _asyncToGenerator(fn) {
        return function () {
            var gen = fn.apply(this, arguments);
            return new Promise(function (resolve, reject) {
                function step(key, arg) {
                    try {
                        var info = gen[key](arg);
                        var value = info.value;
                    } catch (error) {
                        reject(error);
                        return;
                    }

                    if (info.done) {
                        resolve(value);
                    } else {
                        return Promise.resolve(value).then(function (value) {
                            step("next", value);
                        }, function (err) {
                            step("throw", err);
                        });
                    }
                }

                return step("next");
            });
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _dec, _class;

    var Users = exports.Users = (_dec = (0, _aureliaFramework.inject)(_dataServices.DataServices), _dec(_class = function () {
        function Users(data) {
            _classCallCheck(this, Users);

            this.data = data;

            this.USER_SERVICE = 'users';
        }

        Users.prototype.save = function () {
            var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(user) {
                var serverResponse;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (!user) {
                                    _context.next = 5;
                                    break;
                                }

                                _context.next = 3;
                                return this.data.post(user, this.USER_SERVICE);

                            case 3:
                                serverResponse = _context.sent;
                                return _context.abrupt('return', serverResponse);

                            case 5:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function save(_x) {
                return _ref.apply(this, arguments);
            }

            return save;
        }();

        return Users;
    }()) || _class);
});
define('resources/elements/flatpickr',['exports', 'aurelia-framework', 'flatpickr'], function (exports, _aureliaFramework, _flatpickr) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.FlatPickerCustomElement = undefined;

    var _flatpickr2 = _interopRequireDefault(_flatpickr);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _initDefineProp(target, property, descriptor, context) {
        if (!descriptor) return;
        Object.defineProperty(target, property, {
            enumerable: descriptor.enumerable,
            configurable: descriptor.configurable,
            writable: descriptor.writable,
            value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
        });
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
        var desc = {};
        Object['ke' + 'ys'](descriptor).forEach(function (key) {
            desc[key] = descriptor[key];
        });
        desc.enumerable = !!desc.enumerable;
        desc.configurable = !!desc.configurable;

        if ('value' in desc || desc.initializer) {
            desc.writable = true;
        }

        desc = decorators.slice().reverse().reduce(function (desc, decorator) {
            return decorator(target, property, desc) || desc;
        }, desc);

        if (context && desc.initializer !== void 0) {
            desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
            desc.initializer = undefined;
        }

        if (desc.initializer === void 0) {
            Object['define' + 'Property'](target, property, desc);
            desc = null;
        }

        return desc;
    }

    function _initializerWarningHelper(descriptor, context) {
        throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
    }

    var _dec, _dec2, _class, _desc, _value, _class2, _descriptor;

    var FlatPickerCustomElement = exports.FlatPickerCustomElement = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = (_class2 = function () {
        function FlatPickerCustomElement(element) {
            _classCallCheck(this, FlatPickerCustomElement);

            _initDefineProp(this, 'value', _descriptor, this);

            this.element = element;
        }

        FlatPickerCustomElement.prototype.bind = function bind() {
            var defaultConfig = {
                altInput: true,
                altFormat: "F j, Y",
                wrap: true
            };
            this._config = Object.assign({}, defaultConfig);
            this._config.onChange = this._config.onMonthChange = this._config.onYearChange = this.onChange.bind(this);
        };

        FlatPickerCustomElement.prototype.attached = function attached() {
            this.flatpickr = new _flatpickr2.default(this.element.querySelector('.aurelia-flatpickr'), this._config);
        };

        FlatPickerCustomElement.prototype.onChange = function onChange(selectedDates, dateStr, instance) {
            this.value = selectedDates[0];
        };

        FlatPickerCustomElement.prototype.valueChanged = function valueChanged() {
            if (!this.flatpickr) {
                return;
            }
            if (this.value === this.flatpickr.selectedDates[0]) {
                return;
            }
            var newDate = this.value ? this.value : undefined;
            this.flatpickr.setDate(newDate);
        };

        return FlatPickerCustomElement;
    }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec2], {
        enumerable: true,
        initializer: null
    })), _class2)) || _class);
});
define('resources/value-converters/completed',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var CompletedValueConverter = exports.CompletedValueConverter = function () {
    function CompletedValueConverter() {
      _classCallCheck(this, CompletedValueConverter);
    }

    CompletedValueConverter.prototype.toView = function toView(array, value) {
      if (!value) {
        return array.filter(function (item) {
          return !item.completed;
        });
      } else {
        return array;
      }
    };

    return CompletedValueConverter;
  }();
});
define('resources/value-converters/date-format',['exports', 'moment'], function (exports, _moment) {
   'use strict';

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   exports.DateFormatValueConverter = undefined;

   var _moment2 = _interopRequireDefault(_moment);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
         throw new TypeError("Cannot call a class as a function");
      }
   }

   var DateFormatValueConverter = exports.DateFormatValueConverter = function () {
      function DateFormatValueConverter() {
         _classCallCheck(this, DateFormatValueConverter);
      }

      DateFormatValueConverter.prototype.toView = function toView(value) {
         var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'MM-DD-YYYY';

         if (value === undefined || value === null) {
            return;
         }

         return (0, _moment2.default)(value).format(format);
      };

      return DateFormatValueConverter;
   }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><router-view></router-view><require from=\"resources/css/styles.css\"></require></template>"; });
define('text!resources/css/styles.css', ['module'], function(module) { module.exports = ".rightMargin {\r\n    margin-right: 10px;\r\n    }\r\n\r\n    .leftMargin {\r\n        margin-left: 10px;\r\n    }\r\n\r\n    .centerMargin {margin-right: 10px;}\r\n\r\n    \r\n    \r\n\r\n    .button {background-color:white}\r\n\r\n\r\n    \r\n"; });
define('text!modules/home.html', ['module'], function(module) { module.exports = "<template><h1>${message}</h1><center><h1 style=\"color:#5557e9\"><b>Priyankas Mypics</b></h1></center><compose show.bind=\"showLogin\" view=\"./components/login.html\"></compose><compose show.bind=\"!showLogin\" view=\"./components/register.html\"></compose></template>"; });
define('text!modules/list.html', ['module'], function(module) { module.exports = "<template><compose show.bind=\"showList\" view=\"./components/gallerylist.html\"></compose><compose show.bind=\"!showList\" view=\"./components/galleryform.html\"></compose></template>"; });
define('text!modules/pic.html', ['module'], function(module) { module.exports = "<template><compose show.bind=\"showList\" show.bind=\"!showForm\" view=\"./components/piclist.html\"></compose><compose show.bind=\"!showList\" show.bind=\"showForm\" view=\"./components/picform.html\"></compose></template>"; });
define('text!resources/elements/flatpickr.html', ['module'], function(module) { module.exports = "<template><require from=\"flatpickr/flatpickr.css\"></require><div class=\"input-group aurelia-flatpickr\"><input type=\"text\" class=\"aurelia-flatpickr form-control flatPicker\" data-input></div></template>"; });
define('text!modules/components/galleryform.html', ['module'], function(module) { module.exports = "<template><center><h1 style=\"color:#5557e9\"><b>Add Gallery to Mypics</b></h1></center><div class=\"container\"><form class=\"col-lg-3 col-lg-offset-4\"><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><form><div class=\"form-group topMargin\"><label for=\"galleryInput\">Gallery *</label><input value.bind=\"galleryObj.gallery\" type=\"text\" class=\"form-control\" id=\"galleryInput\" aria-describedby=\"galleryHelp\" placeholder=\"Enter Gallery\"> <small id=\"galleryHelp\" class=\"form-text text-muted\">A short name for the gallery.</small></div><div class=\"form-group\"><label for=\"descriptionInput\">Description</label><textarea value.bind=\"galleryObj.description\" type=\"text\" class=\"form-control\" id=\"descriptionInput\" aria-describedby=\"descriptionHelp\" placeholder=\"Enter Description\"></textarea><small id=\"descriptionHelp\" class=\"form-text text-muted\">A short Description forthe gallery.</small></div><button click.trigger=\"saveGallery()\" class=\"btn btn-primary topMargin\">Save</button></form></form></div></template>"; });
define('text!modules/components/gallerylist.html', ['module'], function(module) { module.exports = "<template><center><h1>Galleries!</h1></center><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><div class=\"row\"><span class=\"col\"><container><span class=\"rightMargin pull-right\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i></span> <span class=\"rightMargin pull-right\"><i click.trigger=\"createGallery()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span></container></span></div><div show.bind=\"galleries.galleriesArray.length\"><table class=\"table table-striped\" style=\"color:#00f\"><thead><tr><th bgcolor=\"grey\">Gallery</th><th bgcolor=\"grey\">Description</th><th bgcolor=\"grey\">Edit</th><th bgcolor=\"grey\">Delete</th></tr></thead><tbody><tr repeat.for=\"gallery of galleries.galleriesArray\"><th click.trigger=\"checkGallery(gallery)\">${gallery.gallery}</th><td>${gallery.description}</td><td><i click.trigger=\"editGallery(gallery)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i></td><td><i click.trigger=\"deleteGallery(gallery)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!galleries.galleriesArray.length\"><center><h2>No galleries found!</h2></center></div></div></div></div></template>"; });
define('text!modules/components/login.html', ['module'], function(module) { module.exports = "<template><div><br><form class=\"col-lg-3 col-lg-offset-4\" id=\"LoginForm\"><br><div innerhtml.bind=\"loginError\"></div><div class=\"form-group\"><label for=\"email\"><b>Email:</b></label><input value.bind=\"email\" type=\"email\" autofocus class=\"form-control\" id=\"email\" placeholder=\"Email\"></div><div class=\"form-group\"><label for=\"password\"><b>Password:</b></label><input value.bind=\"password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Password\"></div><button class=\"btn btn-primary\" click.trigger=\"login()\">Login</button> <a href=\"\" class=\"text-muted\" click.trigger=\"showRegister()\">Register</a></form></div></template>"; });
define('text!modules/components/picform.html', ['module'], function(module) { module.exports = "<template><center><h2 style=\"color:#1f6ee4\"><b>Add a picture</b></h2></center><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"back()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><form><div class=\"form\"><div class=\"col\"><h3>Click browse to add pictures below</h3><label class=\"btn btn-primary\">Browse<input type=\"file\" style=\"display:none\" change.delegate=\"changeFiles()\" files.bind=\"files\"></label><small id=\"fileHelp\" class=\"form-text text-muted\">Upload</small></div><div class=\"col-8\"><ul><li repeat.for=\"file of filesToUpload\" class=\"list-group-item\"> ${file.name}<span click.delegate=\"removeFile($index)\" class=\"pull-right\"><i class=\"fa fa-trash\" aria-hidden=\"true\"></i></span></li></ul></div></div><button click.trigger=\"savepic()\" class=\"btn btn-primary\">Save</button></form></div></template>"; });
define('text!modules/components/piclist.html', ['module'], function(module) { module.exports = "<template><center><h2 style=\"color:#1f6ee4\"><b>Picture list!!</b></h2></center><div class=\"container\"><div class=\"card topMargin\"><div class=\"card-body\"><span><i click.trigger=\"backToList()\" class=\"fa fa-arrow-left fa-lg\" aria-hidden=\"true\"></i></span></div></div><div class=\"card topMargin\"><div class=\"card-body\"><div class=\"row\"><span class=\"col\"><span class=\"rightMargin pull-right\"><i click.trigger=\"logout()\" class=\"fa fa-sign-out fa-lg\" aria-hidden=\"true\"></i></span> <span class=\"rightMargin pull-right\"><i click.trigger=\"createpic()\" class=\"fa fa-plus fa-lg\" aria-hidden=\"true\"></i></span></span></div><div show.bind=\"pics.picsArray.length\"><table class=\"table table-striped\" style=\"color:#00f\"><thead><tr><th bgcolor=\"grey\">pic</th><th bgcolor=\"grey\">Edit</th><th bgcolor=\"grey\">Delete</th></tr></thead><tbody><tr repeat.for=\"pic of pics.picsArray\"><td><a href=\"uploads/${pic.galleryId}/${pic.file.fileName}\" target=\"_blank\"><img src=\"uploads/${pic.galleryId}/${pic.file.fileName}\" style=\"width:200px;height:150px\"></a></td><td><i click.trigger=\"editpic(pic)\" class=\"fa fa-pencil rightMargin\" aria-hidden=\"true\"></i></td><td><i click.trigger=\"deletepic(pic)\" class=\"fa fa-trash rightMargin\" aria-hidden=\"true\"></i></td></tr></tbody></table></div><div show.bind=\"!pics.picsArray.length\"><center><center><h2 style=\"color:#e61616\"><b>No Pictures.. please add!!</b></h2></center></center></div></div></div></div></template>"; });
define('text!modules/components/register.html', ['module'], function(module) { module.exports = "<template><br><h2>Register!</h2><form class=\"col-lg-4\" id=\"RegistrationForm\"><div innerhtml.bind=\"registerError\"></div><div class=\"form-group\"><label for=\"InputFirstName\"><b>First Name:</b></label><input type=\"text\" class=\"form-control\" id=\"InputFirstName\" aria-describedby=\"firstNameHelp\" placeholder=\"Enter first name\" value.bind=\"user.firstName\"></div><div class=\"form-group\"><label for=\"InputLastName\"><b>Last Name:</b></label><input type=\"text\" class=\"form-control\" id=\"InputLastName\" aria-describedby=\"lastNameHelp\" placeholder=\"Enter last name\" value.bind=\"user.lastName\"></div><div class=\"form-group\"><label for=\"InputEmail\"><b>Email:</b></label><input type=\"email\" class=\"form-control\" id=\"InputEmail\" aria-describedby=\"emailHelp\" placeholder=\"Enter email\" value.bind=\"user.email\"></div><div class=\"form-group\"><label for=\"password\"><b>Password:</b></label><input value.bind=\"user.password\" type=\"password\" class=\"form-control\" id=\"password\" placeholder=\"Enter Password\"></div><button click.delegate=\"save()\" class=\"btn btn-primary\">Save</button></form></template>"; });
//# sourceMappingURL=app-bundle.js.map