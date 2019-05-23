angular.module('solutionkits.directives', ['solutionkits.services'])
//---------Directive for layouts
.directive("myLayouts", function (CloudMateService, $timeout) {
    return {
        scope: true,
        restrict: 'ECMA',

        templateUrl: 'templates/solutionkits/layouts-of-all-types.html',
        //template: '<div class="slide-content-container"></div>',
        controller: function ($scope, $http, $sce) {

            $scope.trustAsHtml = function (content) {
                return $sce.trustAsHtml(content);
            }
        },
        link: function (scope, element, attrs) {
            //console.log('first link ');
            // attrs.layoutType = contentInfo[attrs.contentId].layoutType;
            var dummy, json, iconID;
            scope.contentData = CloudMateService.getJsonFile(attrs.contentId);
            //console.log(element);
            if (scope.contentData !== undefined) {
                if (scope.contentData.layoutType === 'SVG-Animation') {
                    json = JSON.parse(scope.contentData.jsonLink);
                    var width = scope.contentData.animationWidth;
                    var height = scope.contentData.animationHeight;
                    var fps = scope.contentData.animationFrames;
                    var parentID = 'animation-Container' + scope.contentData.animationUniqueName
                    //scope.createSVGAnimation(json, width, height, fps, parentID);
                    //var jsonDummy = json;
                    //console.log(jsonDummy);
                    if (json !== undefined) {
                        $timeout(function () {
                            if (dummy) {
                                dummy.stop();
                                dummy = new SVGAnim(json, width, height, fps, {}, parentID);
                                dummy.play();
                            } else {
                                dummy = new SVGAnim(json, width, height, fps, {}, parentID);
                                dummy.play();
                            }
                        }, 1000);

                    }
                }

                if (scope.contentData.layoutType === 'Two-PieChart-and-Quote') {
                    // console.log(scope.contentData);
                    scope.chartTitle = scope.contentData.Chart[0].title;
                    scope.chartSource = scope.contentData.source;
                    scope.twopiechartquote = scope.contentData.quote;
                    scope[scope.contentData.Chart[0].type] = scope.contentData.Chart[0].Data[0].pie;
                    scope[scope.contentData.Chart[1].type] = scope.contentData.Chart[1].Data[0].pie;
                    //  console.log(scope);
                    scope.bscgridoneOptions = scope.contentData.Chart[0].Data[0].dataoption[0];
                    scope.bscgridtwoOptions = scope.contentData.Chart[1].Data[0].dataoption[0];
                }

                if (scope.contentData.layoutType === 'Chart-and-Quote') {
                    scope.chartSource = scope.contentData.source;
                    scope.barchartquote = scope.contentData.quote;
                    scope[scope.contentData.type] = scope.contentData.Data[0].bar;
                    scope.bscdxChartoptions = scope.contentData.Data[0].dataoption[0];
                    scope.bscdxChartoptions.commonSeriesSettings.label.customizeText = function (data) {
                        return data.valueText + '%';
                    };
                    if (scope.bscdxChartoptions.commonSeriesSettings.label.font !== undefined) {
                        scope.bscdxChartoptions.commonSeriesSettings.label.font.size = '8px';
                    }
                }

                if (scope.contentData.layoutType === 'Richtext') {
                    scope.richtextData = scope.contentData.relatedContent;
                }
                if (scope.contentData.layoutType === 'Circle-and-Text') {
                    iconID = scope.contentData.idAndText;
                    $timeout(function () {
                        for (var i = 0; i < iconID.length; i++) {

                            angular.element(document.querySelectorAll("#" + iconID[i].id)).css("cursor", "pointer");
                            angular.element(document.querySelectorAll("#" + iconID[i].id)).attr("idIndex", i);
                            angular.element(document.querySelectorAll("#" + iconID[i].id)).mouseover(function () {
                                var tempClass = "icon icon-" + iconID[$(this).attr("idIndex")].iconID;
                                var iconele = "<span class='" + tempClass + "'></span>";
                                angular.element(document.querySelectorAll("#icon-field")).css("display", "block");
                                angular.element(document.querySelectorAll("#title-feild")).css("color", "#8f1a95");
                                angular.element(document.querySelectorAll("#title-feild")).css("text-align", "left");
                                angular.element(document.querySelectorAll("#icon-field")).html(iconele);
                                angular.element(document.querySelectorAll("#title-feild")).html(iconID[$(this).attr("idIndex")].title);
                                angular.element(document.querySelectorAll("#text-feild")).html(iconID[$(this).attr("idIndex")].text);
                            });
                            angular.element(document.querySelectorAll("#" + iconID[i].id)).mouseleave(function () {
                                angular.element(document.querySelectorAll("#icon-field")).css("display", "none");
                                angular.element(document.querySelectorAll("#title-feild")).css("text-align", "center");
                                angular.element(document.querySelectorAll("#title-feild")).css("color", "#8e8e8e");
                                angular.element(document.querySelectorAll(".title-feild-text")).html("Long-term profitability with accurate view of demand across products, channels and customers and positioning your inventory for maximum service and cost-effectiveness<br/> <span class='smallhover'>Hover on the icons</span>");
                                angular.element(document.querySelectorAll(".title-feild-normal")).html("Hover on the icons");
                                angular.element(document.querySelectorAll("#text-feild")).html("");
                                angular.element(document.querySelectorAll("#icon-field")).html("");
                            });

                        }
                    }, 1000);

                }

                if (scope.contentData.layoutType === 'Icon-DonutChart-BarChart') {
                    // console.log(scope.contentData);
                    //scope.chartTitle = scope.contentData.Chart[0].title;
                    //scope.chartSource = scope.contentData.source;
                    //scope.twopiechartquote = scope.contentData.quote;
                    scope[scope.contentData.Chart[0].type] = scope.contentData.Chart[0].Data[0].donut;
                    scope.retailDonutOptions = scope.contentData.Chart[0].Data[0].dataoption[0];
                }

            }

            scope.$on("$destroy", function () {
                dummy = null;
                json = null;
                if (iconID) {
                    for (var i = 0; i < iconID.length; i++) {

                        if (angular.element(document.querySelectorAll("#" + iconID[i].id))) {
                            angular.element(document.querySelectorAll("#" + iconID[i].id)).unbind("mouseenter");
                            angular.element(document.querySelectorAll("#" + iconID[i].id)).unbind("mouseleave");
                        }
                    }
                    iconID = null;
                }

            });
        }
    };
})

//------------------ Menu Directive
.directive("menuLayout", function (CloudMateService) {
    return {
        scope: true,
        restrict: 'ECMA',
        templateUrl: 'templates/solutionkits/new-menu-layout.html',
        controller: function ($scope, $http, $sce, $state, $rootScope) {

            $scope.trustAsHtml = function (content) {
                return $sce.trustAsHtml(content);
            };
            $scope.gotoHome = function (menuid) {
                $state.go("Industry Home", { menuid: menuid });
            };
            $scope.expandAll = function () {
                angular.element(document.querySelectorAll('.expandAndCollapse')).css({ 'max-height': '1000px', 'padding': '8px' });
                //angular.element(document.querySelectorAll('.first-sub-menu')).css({ 'max-height': '250vh', 'opacity': '1' });
                //angular.element(document.querySelectorAll('.second-sub-menu')).css({ 'height': '20vh', 'opacity': '1' });
                //angular.element(document.querySelectorAll('.reveal,.secondReveal')).css('color', 'transparent');
                angular.element(document.querySelectorAll('#collapse-all-newicons')).css('display', 'block');
                angular.element(document.querySelectorAll('#expand-all-newicons')).css('display', 'none');
            };
            $scope.collapseAll = function () {
                angular.element(document.querySelectorAll('.expandAndCollapse')).css({ 'max-height': '0px', 'padding': '0px' });
                //angular.element(document.querySelectorAll('.first-sub-menu')).attr('style', '');
                //angular.element(document.querySelectorAll('.second-sub-menu')).attr('style', '');
                //angular.element(document.querySelectorAll('.reveal,.secondReveal')).css('color', '#E59111');
                angular.element(document.querySelectorAll('#expand-all-newicons')).css('display', 'block');
                angular.element(document.querySelectorAll('#collapse-all-newicons')).css('display', 'none');
            };
            $scope.callMenu = function () {
                angular.element(document.querySelectorAll('#menu-icon')).toggleClass('open');
                angular.element(document.querySelectorAll('#openCloseMenu')).toggleClass('open');
                angular.element(document.querySelectorAll('.forMenuAnimation')).toggleClass('addperspective');
                if (angular.element(document.querySelectorAll('#bsc-menu')).hasClass('menuOutLeft')) {
                    angular.element(document.querySelectorAll('#bsc-menu')).removeClass('menuOutLeft');
                    angular.element(document.querySelectorAll('#bsc-menu')).addClass('menuInLeft');
                } else {
                    angular.element(document.querySelectorAll('#bsc-menu')).addClass('menuOutLeft');
                    angular.element(document.querySelectorAll('#bsc-menu')).removeClass('menuInLeft');
                }
            };
            $scope.ifOpenThenClose = function () {
                if (angular.element(document.querySelectorAll('#bsc-menu')).hasClass('menuInLeft')) {
                    angular.element(document.querySelectorAll('#bsc-menu')).removeClass('menuInLeft');
                    angular.element(document.querySelectorAll('#bsc-menu')).addClass('menuOutLeft');
                }
                if (angular.element(document.querySelectorAll('#menu-icon')).hasClass('open')) {
                    angular.element(document.querySelectorAll('#menu-icon')).removeClass('open');
                }
                if (angular.element(document.querySelectorAll('#openCloseMenu')).hasClass('open')) {
                    angular.element(document.querySelectorAll('#openCloseMenu')).removeClass('open');
                }
                if (angular.element(document.querySelectorAll('.forMenuAnimation')).hasClass('addperspective')) {
                    angular.element(document.querySelectorAll('.forMenuAnimation')).removeClass('addperspective')
                }
            };
            $scope.openTheChildren = function ($event) {
                //console.log(gotElement);
                var openedAt = angular.element($event.target).attr('opened-at');
                if ($rootScope.openedChild === null || $rootScope.openedChild === undefined) {
                    $rootScope.openedChild = openedAt;
                } else {
                    console.log($rootScope.openedChild);
                    var getTheOldOpenedChild = $rootScope.openedChild;
                    getTheOldOpenedChild = getTheOldOpenedChild.split("-");
                    var getTheOldOpenedChildLength = getTheOldOpenedChild.length;
                    var newOpenedChild = openedAt;
                    newOpenedChild = newOpenedChild.split("-");
                    var i = 0;
                    var newOpenedChildLength = newOpenedChild.length;
                    if (newOpenedChildLength === getTheOldOpenedChildLength) {
                        for (i = 0; i <= newOpenedChildLength; i++) {
                            if (newOpenedChild[i] !== getTheOldOpenedChild[i]) {
                                console.log($rootScope.openedChild + "--old child");
                                if (angular.element(document.querySelectorAll('#revealIcon-' + $rootScope.openedChild)).hasClass("ion-ios-minus-outline")) {
                                    angular.element(document.querySelectorAll('#revealIcon-' + $rootScope.openedChild)).removeClass("ion-ios-minus-outline")
                                }
                                console.log(openedAt + "--new child");
                            }
                        }
                    } else {
                        if (newOpenedChildLength > getTheOldOpenedChildLength) {

                        } else {
                            for (var i = 0; i <= getTheOldOpenedChildLength; i++) {
                                if (getTheOldOpenedChildLength === 1) {
                                    if (angular.element(document.querySelectorAll('#revealIcon-' + getTheOldOpenedChild[0])).hasClass("ion-ios-minus-outline")) {
                                        angular.element(document.querySelectorAll('#revealIcon-' + getTheOldOpenedChild[0])).removeClass("ion-ios-minus-outline")
                                    }
                                }
                                if (getTheOldOpenedChildLength === 2) {
                                    if (angular.element(document.querySelectorAll('#revealIcon-' + getTheOldOpenedChild[0])).hasClass("ion-ios-minus-outline")) {
                                        angular.element(document.querySelectorAll('#revealIcon-' + getTheOldOpenedChild[0])).removeClass("ion-ios-minus-outline")
                                    }
                                    if (angular.element(document.querySelectorAll('#revealIcon-' + getTheOldOpenedChild[0] + '-' + getTheOldOpenedChild[1])).hasClass("ion-ios-minus-outline")) {
                                        angular.element(document.querySelectorAll('#revealIcon-' + getTheOldOpenedChild[0] + '-' + getTheOldOpenedChild[1])).removeClass("ion-ios-minus-outline")
                                    }
                                }
                                if (getTheOldOpenedChildLength === 3) {
                                    if (angular.element(document.querySelectorAll('#revealIcon-' + getTheOldOpenedChild[0])).hasClass("ion-ios-minus-outline")) {
                                        angular.element(document.querySelectorAll('#revealIcon-' + getTheOldOpenedChild[0])).removeClass("ion-ios-minus-outline")
                                    }
                                    if (angular.element(document.querySelectorAll('#revealIcon-' + getTheOldOpenedChild[0] + '-' + getTheOldOpenedChild[1])).hasClass("ion-ios-minus-outline")) {
                                        angular.element(document.querySelectorAll('#revealIcon-' + getTheOldOpenedChild[0] + '-' + getTheOldOpenedChild[1])).removeClass("ion-ios-minus-outline")
                                    }
                                    if (angular.element(document.querySelectorAll('#revealIcon-' + getTheOldOpenedChild[0] + '-' + getTheOldOpenedChild[1] + '-' + getTheOldOpenedChild[2])).hasClass("ion-ios-minus-outline")) {
                                        angular.element(document.querySelectorAll('#revealIcon-' + getTheOldOpenedChild[0] + '-' + getTheOldOpenedChild[1] + '-' + getTheOldOpenedChild[2])).removeClass("ion-ios-minus-outline")
                                    }
                                }

                            }

                        }
                    }
                    $rootScope.openedChild = openedAt;
                }
                openedAt = openedAt.split("-");
                if (openedAt.length === 1) {
                    angular.element(document.querySelectorAll('.expandAndCollapse')).css({ 'max-height': '0px', 'padding': '0px' });
                    angular.element(document.querySelectorAll('#children-of-' + openedAt[0])).css({ 'max-height': '500px', 'padding': '8px' });
                    console.log('#children-of-' + openedAt[0]);
                }
                if (openedAt.length === 2) {
                    angular.element(document.querySelectorAll('.expandAndCollapse')).css({ 'max-height': '0px', 'padding': '0px' });
                    angular.element(document.querySelectorAll('#children-of-' + openedAt[0])).css({ 'max-height': '500px', 'padding': '8px' });
                    angular.element(document.querySelectorAll('#children-of-' + openedAt[0] + '-' + openedAt[1])).css({ 'max-height': '500px', 'padding': '8px' });
                    console.log('#children-of-' + openedAt[0] + '-' + openedAt[1]);
                }
                if (openedAt.length === 3) {
                    angular.element(document.querySelectorAll('.expandAndCollapse')).css({ 'max-height': '0px', 'padding': '0px' });
                    angular.element(document.querySelectorAll('#children-of-' + openedAt[0])).css({ 'max-height': '500px', 'padding': '8px' });
                    angular.element(document.querySelectorAll('#children-of-' + openedAt[0] + '-' + openedAt[1])).css({ 'max-height': '500px', 'padding': '8px' });
                    angular.element(document.querySelectorAll('#children-of-' + openedAt[0] + '-' + openedAt[1] + '-' + openedAt[2])).css({ 'max-height': '500px', 'padding': '8px' });
                    console.log('#children-of-' + openedAt[0] + '-' + openedAt[1] + '-' + openedAt[2]);
                }

                if (angular.element($event.target).hasClass("ion-ios-minus-outline")) {
                    if (openedAt.length === 1) {
                        if (angular.element(document.querySelectorAll('.level-1-container .reveal'))) {
                            var elements = angular.element(document.querySelectorAll('.level-1-container .reveal'))
                            var i = 0;
                            var eleLength = elements.length;
                            for (i = 0; i <= eleLength; i++) {
                                if (angular.element(elements[i]).hasClass("ion-ios-minus-outline")) {
                                    angular.element(elements[i]).removeClass("ion-ios-minus-outline");
                                }
                            }
                        }
                        if (angular.element(document.querySelectorAll('.level-1-children .secondReveal'))) {
                            var elements = angular.element(document.querySelectorAll('.level-1-children .secondReveal'))
                            var i = 0;
                            var eleLength = elements.length;
                            for (i = 0; i <= eleLength; i++) {
                                if (angular.element(elements[i]).hasClass("ion-ios-minus-outline")) {
                                    angular.element(elements[i]).removeClass("ion-ios-minus-outline");
                                }
                            }
                        }
                        angular.element(document.querySelectorAll('#children-of-' + openedAt[0])).css({ 'max-height': '0px', 'padding': '0px' });
                        console.log('#children-of-' + openedAt[0]);
                    }
                    if (openedAt.length === 2) {
                        angular.element(document.querySelectorAll('#children-of-' + openedAt[0] + '-' + openedAt[1])).css({ 'max-height': '0px', 'padding': '0px' });
                        console.log('#children-of-' + openedAt[0] + '-' + openedAt[1]);
                    }
                    if (openedAt.length === 3) {
                        angular.element(document.querySelectorAll('#children-of-' + openedAt[0] + '-' + openedAt[1] + '-' + openedAt[2])).css({ 'max-height': '0px', 'padding': '0px' });
                        console.log('#children-of-' + openedAt[0] + '-' + openedAt[1] + '-' + openedAt[2]);
                    }
                }

                angular.element($event.target).toggleClass("ion-ios-minus-outline");

                //console.log(openedAt);
            };
        },
        link: function (scope, element, attrs, $rootScope, $state) {

            scope.items = CloudMateService.getJsonFile(attrs.menuId);
            if (scope.items !== undefined) {
                // console.log(scope.items);
            }
            scope.$on("$destroy", function () {
                scope.items = null;
            });

            scope.$on("$destroy", function () {
                scope.items = null;
            });
            if (scope.items !== undefined) {
                scope.IndustiesName = scope.items.Industries[0].Name;
            }
        }
    };
})
.directive('dynamicUrl', function () {
    return {
        restrict: 'A',
        link: function postLink(scope, element, attr) {
            element.attr('poster', attr.dynamicUrlPoster);
            element.attr('data-video-id', attr.dynamicUrlVideoId);
        }
    };
})
