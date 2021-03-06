2.4
===

* Added bsmodals_entry() a quick way of getting a single piece of text

2.3
===

* Added clear_errors() and hide() to the base form class
* Added handling of data keys beginning with "#" to look for ids in set_data()
method

2.2.1
=====

* Documentation update

2.2
===

* Replaced hard coded English text with overridable Django variables

2.1.2
=====

* More fixes for default behaviour of dialog on form submission via pressing
enter

2.1.1
=====

* Change base form Submit button type to be of type submit and to be after the
Cancel button so that browsers that allow enter for form submission aren't
confused

2.1
===

* Add PATCH capability to RestModal

2.0.1
=====

* Bug fix with pre-populating <textarea> tags

2.0
===

* BREAKING CHANGES!
* bsmodals_confirm is now a single re-used dialog to be included once
* bsmodal_form and bsmodal_dialog have been replaced with FormModal and
AJAXModal objects
* all custom dialogs now inherit from the same base class, so tag naming
conventions are now consistent

1.1.1
=====

* Change .text() calls to .html() calls so confirm, alert and error dialogs
can be populated with HTML

1.1.0
=====

* Add RestModal form

1.0.1
=====

* Fix bug where form and general dialog buttons were being registered multiple
times

1.0.0
=====

* Add ability to have multiple confirmation boxes
* Add ajax form dialogs and tools
* Made compatible with Django 3+, Python 3.6+
* Breaking change release, some calls are no longer backwardly compatible

0.1.1
=====

* fixed packaging error

0.1
===

* initial release to pypi
