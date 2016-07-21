/*jshint browser: true */
/*global REPORTER_VERSION, $ */

(function () {
    'use strict';

    var deprecatedClasses,
        deprecatedDirectives,
        deprecatedSassVariables,
        MSG_LEGACY_CLASS = 'This class is part of a legacy style library that is no longer included in Sky',
        MSG_LEGACY_SASS_VARIABLE = 'This sass variable is part of a legacy style library that is no longer included in Sky';

    deprecatedSassVariables = [
        ['$white', '$bb-color-white'],
        ['$nav-bg', '$bb-nav-bg-color'],
        ['$brand-primary-hover', null, MSG_LEGACY_SASS_VARIABLE],
        ['$brand-primary-text', null, MSG_LEGACY_SASS_VARIABLE],
        ['$font-stack', '$font-family-base'],
        ['$gray-bg', '$body-bg'],
        ['$brand-alternate', '$bb-brand-alternate'],
        ['$brand-alternate-light', '$bb-brand-alternate-light'],
        ['$brand-alternate-lighter', '$bb-brand-alternate-lighter'],
        ['$purple', '$bb-color-purple'],
        ['$selected-text-color', '$bb-nav-selected-color'],
        ['$nav-color', '$bb-nav-color'],
        ['$nav-selected-background-color', '$bb-nav-selected-bg-color'],
        ['$nav-item-padding', '$bb-nav-item-padding'],
        ['$nav-selected-border-width', '$bb-nav-selected-border-width'],
        ['$error-color', '$bb-error-color'],
        ['$yellow-button-color', '$alert-warning-bg'],
        ['$yellow-button-border', '$alert-warning-border'],
        ['$container-border', null, MSG_LEGACY_SASS_VARIABLE],
        ['$blue-gray', null, MSG_LEGACY_SASS_VARIABLE],
        ['$blue-light', null, MSG_LEGACY_SASS_VARIABLE],
        ['$selected-row-color', null, MSG_LEGACY_SASS_VARIABLE],
        ['$label-badge-color', '$bb-label-badge-color'],
        ['$navy', '$bb-color-green'],
        ['$blue', '$bb-color-blue'],
        ['$yellow', '$bb-color-yellow'],
        ['$red', '$bb-color-red'],
        ['$lazur', '$bb-color-aqua'],
        ['$light-gray', '$gray-lighter'],
        ['$font-size-xl', '$bb-font-size-xl'],
        ['$font-size-lg', '$bb-font-size-lg'],
        ['$font-family-alternate', '$bb-font-family-alternate'],
        ['$font-family-narrow', '$bb-font-family-narrow'],
        ['$dark-gray', null, MSG_LEGACY_SASS_VARIABLE],
        ['$font-size-xxxl', '$bb-font-size-xxxl'],
        ['$font-size-xxl', '$bb-font-size-xxl'],
        ['$font-size-sm', '$bb-font-size-sm'],
        ['$alternate-font-size-xxxl', '$bb-alternate-font-size-xxxl'],
        ['$alternate-font-size-xxl', '$bb-alternate-font-size-xxl'],
        ['$alternate-font-size-xl', '$bb-alternate-font-size-xl'],
        ['$alternate-font-size-lg', '$bb-alternate-font-size-lg'],
        ['$alternate-font-size-base', '$bb-alternate-font-size-base'],
        ['$alternate-font-size-sm', '$bb-alternate-font-size-sm']
    ];

    deprecatedClasses = [
        ['sky-icon-multi-action', 'use the bb-context-menu-directive for context menu button styling'],
        ['title', 'bb-tooltip-title'],
        ['tooltip-container', null, 'native tooltip styles are overridden so this class is unnecessary'],
        ['page-tooltip', null, 'native tooltip styles are overridden so this class is unnecessary'],
        ['info-alert', null],
        ['checklist-checkbox-column', 'bb-checklist-checkbox-column'],
        ['checklist-filter-bar', 'bb-checklist-filter-bar'],
        ['checklist-no-items', 'bb-checklist-no-items'],
        ['checklist-link', 'bb-checklist-link'],
        ['checklist-row', 'bb-checklist-row'],
        ['checklist-wrapper', 'bb-checklist-wrapper'],
        ['description-column', 'bb-checklist-description-column'],
        ['name-column', 'bb-checklist-name-column'],
        ['add-button', 'bb-grid-toolbar-btn-add'],
        ['applied-filter-bar', 'bb-applied-filter-bar'],
        ['applied-filter-content', 'bb-applied-filter-content'],
        ['applied-filter-header', 'bb-applied-filter-header'],
        ['applied-filter-remove', 'bb-applied-filter-remove'],
        ['applied-filter-text', 'bb-applied-filter-text'],
        ['column-picker-button-icon', 'bb-column-picker-btn-icon'],
        ['filter-button-icon', 'bb-filter-btn-icon'],
        ['grid-action-bar', 'bb-grid-action-bar'],
        ['grid-action-bar-and-back-to-top', 'bb-grid-action-bar-and-back-to-top'],
        ['grid-action-bar-buttons', 'bb-grid-action-bar-buttons'],
        ['grid-action-bar-clear-selection', 'bb-grid-action-bar-clear-selection'],
        ['grid-action-bar-mobile-btn', 'bb-grid-action-bar-mobile-btn'],
        ['grid-action-bar-mobile-cancel', 'bb-grid-action-bar-mobile-cancel'],
        ['grid-action-bar-mobile-buttons', 'bb-grid-action-bar-mobile-buttons'],
        ['grid-action-bar-btn-container', 'bb-grid-action-bar-btn-container'],
        ['grid-column-picker-wrapper', 'bb-grid-column-picker-wrapper'],
        ['grid-column-picker-table', 'bb-grid-column-picker-table'],
        ['grid-filter-summary-item', 'bb-grid-filter-summary-item'],
        ['grid-filters', 'bb-grid-filters'],
        ['grid-filters-body', 'bb-grid-filters-body'],
        ['grid-filters-body-group-content', 'bb-grid-filters-body-group-content'],
        ['grid-filters-body-group-header-icon', 'bb-grid-filters-body-group-header-icon'],
        ['grid-filters-box', 'bb-grid-filters-box'],
        ['grid-filters-container', 'bb-grid-filters-container'],
        ['grid-filters-fixed-bottom', 'bb-grid-filters-fixed-bottom'],
        ['grid-filters-fixed-top', 'bb-grid-filters-fixed-top'],
        ['grid-filters-footer', 'bb-grid-filters-footer'],
        ['grid-filters-header', 'bb-grid-filters-header'],
        ['grid-filters-header-hide', 'bb-grid-filters-header-hide'],
        ['grid-filters-header-title', 'bb-grid-filters-header-title'],
        ['grid-filters-icon', 'bb-grid-filters-icon'],
        ['grid-toolbar-container', 'bb-grid-toolbar-container'],
        ['search-container', 'bb-search-container'],
        ['search-icon', 'bb-search-icon'],
        ['table-backtotop', 'bb-table-backtotop'],
        ['table-loadmore', 'bb-table-loadmore'],
        ['table-toolbar', 'bb-table-toolbar'],
        ['tile', 'bb-tile'],
        ['tile-header', 'bb-tile-header'],
        ['tile-content-section', 'bb-tile-content-section'],
        ['tile-chevron', 'bb-tile-chevron'],
        ['tile-grab-handle', 'bb-tile-grab-handle'],
        ['tile-toolbar', 'bb-tile-toolbar'],
        ['toolbar-button', 'bb-toolbar-btn'],
        ['toolbar-button-icon', 'bb-toolbar-btn-icon'],
        ['toolbar-button-label', 'bb-toolbar-btn-label'],
        ['viewkeeper-fixed', 'bb-viewkeeper-fixed'],
        ['viewkeeper-ignore-fixed', 'bb-viewkeeper-ignore-fixed'],
        // Legacy classes with no replacements
        ['actions', null, MSG_LEGACY_CLASS],
        ['animation-efect-links', null, MSG_LEGACY_CLASS],
        ['animation-text-box', null, MSG_LEGACY_CLASS],
        ['animation-text-info', null, MSG_LEGACY_CLASS],
        ['b-r', null, MSG_LEGACY_CLASS],
        ['badge-disable', null, MSG_LEGACY_CLASS],
        ['badge-inverse', null, MSG_LEGACY_CLASS],
        ['badge-warning-light', null, MSG_LEGACY_CLASS],
        ['badge-white', null, MSG_LEGACY_CLASS],
        ['big-icon', null, MSG_LEGACY_CLASS],
        ['black-bg', null, MSG_LEGACY_CLASS],
        ['blank-panel', null, MSG_LEGACY_CLASS],
        ['block', null, MSG_LEGACY_CLASS],
        ['blue-bg', null, MSG_LEGACY_CLASS],
        ['body-small', null, MSG_LEGACY_CLASS],
        ['border-bottom', null, MSG_LEGACY_CLASS],
        ['border-left-right', null, MSG_LEGACY_CLASS],
        ['boxed-layout', null, MSG_LEGACY_CLASS],
        ['branding', null, MSG_LEGACY_CLASS],
        ['breadcrumb', null, MSG_LEGACY_CLASS],
        ['btn-group-xs', null, MSG_LEGACY_CLASS],
        ['btn-large-dim', null, MSG_LEGACY_CLASS],
        ['btn-outline', null, MSG_LEGACY_CLASS],
        ['btn-rounded', null, MSG_LEGACY_CLASS],
        ['btn-w-m', null, MSG_LEGACY_CLASS],
        ['btn-xl', null, MSG_LEGACY_CLASS],
        ['btn-xs', null, MSG_LEGACY_CLASS],
        ['category-list', null, MSG_LEGACY_CLASS],
        ['chat', null, MSG_LEGACY_CLASS],
        ['chat-activity-list', null, MSG_LEGACY_CLASS],
        ['chat-body', null, MSG_LEGACY_CLASS],
        ['chat-element', null, MSG_LEGACY_CLASS],
        ['chat-panel', null, MSG_LEGACY_CLASS],
        ['chat-photo', null, MSG_LEGACY_CLASS],
        ['check-link', null, MSG_LEGACY_CLASS],
        ['check-mail', null, MSG_LEGACY_CLASS],
        ['chosen-choices', null, MSG_LEGACY_CLASS],
        ['chosen-container-multi', null, MSG_LEGACY_CLASS],
        ['chosen-container-single', null, MSG_LEGACY_CLASS],
        ['chosen-single', null, MSG_LEGACY_CLASS],
        ['circle-border', null, MSG_LEGACY_CLASS],
        ['clear', null, MSG_LEGACY_CLASS],
        ['clear-list', null, MSG_LEGACY_CLASS],
        ['compose-mail', null, MSG_LEGACY_CLASS],
        ['contact-box', null, MSG_LEGACY_CLASS],
        ['content', null, MSG_LEGACY_CLASS],
        ['corner', null, MSG_LEGACY_CLASS],
        ['count-info', null, MSG_LEGACY_CLASS],
        ['css-animation-box', null, MSG_LEGACY_CLASS],
        ['dashboard-chart', null, MSG_LEGACY_CLASS],
        ['dashboard-header', null, MSG_LEGACY_CLASS],
        ['dashboard_2', null, MSG_LEGACY_CLASS],
        ['dashboard_3', null, MSG_LEGACY_CLASS],
        ['dataTable', null, MSG_LEGACY_CLASS],
        ['date', null, MSG_LEGACY_CLASS],
        ['dim', null, MSG_LEGACY_CLASS],
        ['dropdown-alerts', null, MSG_LEGACY_CLASS],
        ['dropdown-messages', null, MSG_LEGACY_CLASS],
        ['dropdown-messages-box', null, MSG_LEGACY_CLASS],
        ['dropdown-tasks', null, MSG_LEGACY_CLASS],
        ['dropdown-user', null, MSG_LEGACY_CLASS],
        ['easypie-text', null, MSG_LEGACY_CLASS],
        ['easypiechart', null, MSG_LEGACY_CLASS],
        ['email_compose', null, MSG_LEGACY_CLASS],
        ['email_view', null, MSG_LEGACY_CLASS],
        ['external-event', null, MSG_LEGACY_CLASS],
        ['fancybox', null, MSG_LEGACY_CLASS],
        ['faq-answer', null, MSG_LEGACY_CLASS],
        ['faq-item', null, MSG_LEGACY_CLASS],
        ['faq-question', null, MSG_LEGACY_CLASS],
        ['fc-agenda', null, MSG_LEGACY_CLASS],
        ['fc-border-separate', null, MSG_LEGACY_CLASS],
        ['fc-button', null, MSG_LEGACY_CLASS],
        ['fc-content', null, MSG_LEGACY_CLASS],
        ['fc-event', null, MSG_LEGACY_CLASS],
        ['fc-event-end', null, MSG_LEGACY_CLASS],
        ['fc-event-hori', null, MSG_LEGACY_CLASS],
        ['fc-event-start', null, MSG_LEGACY_CLASS],
        ['fc-event-time', null, MSG_LEGACY_CLASS],
        ['fc-event-title', null, MSG_LEGACY_CLASS],
        ['fc-header-title', null, MSG_LEGACY_CLASS],
        ['fc-ltr', null, MSG_LEGACY_CLASS],
        ['fc-rtl', null, MSG_LEGACY_CLASS],
        ['fc-state-active', null, MSG_LEGACY_CLASS],
        ['fc-state-default', null, MSG_LEGACY_CLASS],
        ['fc-state-highlight', null, MSG_LEGACY_CLASS],
        ['fc-widget-content', null, MSG_LEGACY_CLASS],
        ['fc-widget-header', null, MSG_LEGACY_CLASS],
        ['feed-activity-list', null, MSG_LEGACY_CLASS],
        ['feed-element', null, MSG_LEGACY_CLASS],
        ['feed-photo', null, MSG_LEGACY_CLASS],
        ['file', null, MSG_LEGACY_CLASS],
        ['file-box', null, MSG_LEGACY_CLASS],
        ['file-control', null, MSG_LEGACY_CLASS],
        ['file-manager', null, MSG_LEGACY_CLASS],
        ['file-name', null, MSG_LEGACY_CLASS],
        ['first-word', null, MSG_LEGACY_CLASS],
        ['fist-item', null, MSG_LEGACY_CLASS],
        ['fixed', null, MSG_LEGACY_CLASS],
        ['fixed-nav', null, MSG_LEGACY_CLASS],
        ['fixed-sidebar', null, MSG_LEGACY_CLASS],
        ['fixed_full', null, MSG_LEGACY_CLASS],
        ['float-e-margins', null, MSG_LEGACY_CLASS],
        ['flot-chart', null, MSG_LEGACY_CLASS],
        ['flot-chart-content', null, MSG_LEGACY_CLASS],
        ['folder-list', null, MSG_LEGACY_CLASS],
        ['font-bold', null, MSG_LEGACY_CLASS],
        ['font-noraml', null, MSG_LEGACY_CLASS],
        ['footer', null, MSG_LEGACY_CLASS],
        ['full-width', null, MSG_LEGACY_CLASS],
        ['gallery', null, MSG_LEGACY_CLASS],
        ['geo-statistic', null, MSG_LEGACY_CLASS],
        ['gray-bg', null, MSG_LEGACY_CLASS],
        ['h-200', null, MSG_LEGACY_CLASS],
        ['handle', null, MSG_LEGACY_CLASS],
        ['hr-line-dashed', null, MSG_LEGACY_CLASS],
        ['hr-line-solid', null, MSG_LEGACY_CLASS],
        ['i-checks', null, MSG_LEGACY_CLASS],
        ['icon', null, MSG_LEGACY_CLASS],
        ['icons-box', null, MSG_LEGACY_CLASS],
        ['image', null, MSG_LEGACY_CLASS],
        ['inbox', null, MSG_LEGACY_CLASS],
        ['infont', null, MSG_LEGACY_CLASS],
        ['inline', null, MSG_LEGACY_CLASS],
        ['input-s', null, MSG_LEGACY_CLASS],
        ['input-s-lg', null, MSG_LEGACY_CLASS],
        ['input-s-sm', null, MSG_LEGACY_CLASS],
        ['invoice-table', null, MSG_LEGACY_CLASS],
        ['invoice-total', null, MSG_LEGACY_CLASS],
        ['jqsfield', null, MSG_LEGACY_CLASS],
        ['jqstooltip', null, MSG_LEGACY_CLASS],
        ['label-inverse', null, MSG_LEGACY_CLASS],
        ['label-warning-light', null, MSG_LEGACY_CLASS],
        ['label-white', null, MSG_LEGACY_CLASS],
        ['lazur-bg', null, MSG_LEGACY_CLASS],
        ['legendLabel', null, MSG_LEGACY_CLASS],
        ['link-block', null, MSG_LEGACY_CLASS],
        ['lock-word', null, MSG_LEGACY_CLASS],
        ['lockscreen', null, MSG_LEGACY_CLASS],
        ['login-panel', null, MSG_LEGACY_CLASS],
        ['loginscreen', null, MSG_LEGACY_CLASS],
        ['logo-element', null, MSG_LEGACY_CLASS],
        ['logo-name', null, MSG_LEGACY_CLASS],
        ['m', null, MSG_LEGACY_CLASS],
        ['m-b', null, MSG_LEGACY_CLASS],
        ['m-b-lg', null, MSG_LEGACY_CLASS],
        ['m-b-md', null, MSG_LEGACY_CLASS],
        ['m-b-n', null, MSG_LEGACY_CLASS],
        ['m-b-n-lg', null, MSG_LEGACY_CLASS],
        ['m-b-n-md', null, MSG_LEGACY_CLASS],
        ['m-b-n-sm', null, MSG_LEGACY_CLASS],
        ['m-b-n-xl', null, MSG_LEGACY_CLASS],
        ['m-b-n-xs', null, MSG_LEGACY_CLASS],
        ['m-b-n-xxs', null, MSG_LEGACY_CLASS],
        ['m-b-none', null, MSG_LEGACY_CLASS],
        ['m-b-sm', null, MSG_LEGACY_CLASS],
        ['m-b-xl', null, MSG_LEGACY_CLASS],
        ['m-b-xs', null, MSG_LEGACY_CLASS],
        ['m-b-xxs', null, MSG_LEGACY_CLASS],
        ['m-l', null, MSG_LEGACY_CLASS],
        ['m-l-lg', null, MSG_LEGACY_CLASS],
        ['m-l-md', null, MSG_LEGACY_CLASS],
        ['m-l-n', null, MSG_LEGACY_CLASS],
        ['m-l-n-lg', null, MSG_LEGACY_CLASS],
        ['m-l-n-md', null, MSG_LEGACY_CLASS],
        ['m-l-n-sm', null, MSG_LEGACY_CLASS],
        ['m-l-n-xl', null, MSG_LEGACY_CLASS],
        ['m-l-n-xs', null, MSG_LEGACY_CLASS],
        ['m-l-n-xxs', null, MSG_LEGACY_CLASS],
        ['m-l-none', null, MSG_LEGACY_CLASS],
        ['m-l-sm', null, MSG_LEGACY_CLASS],
        ['m-l-xl', null, MSG_LEGACY_CLASS],
        ['m-l-xs', null, MSG_LEGACY_CLASS],
        ['m-lg', null, MSG_LEGACY_CLASS],
        ['m-md', null, MSG_LEGACY_CLASS],
        ['m-n', null, MSG_LEGACY_CLASS],
        ['m-r', null, MSG_LEGACY_CLASS],
        ['m-r-lg', null, MSG_LEGACY_CLASS],
        ['m-r-md', null, MSG_LEGACY_CLASS],
        ['m-r-n', null, MSG_LEGACY_CLASS],
        ['m-r-n-lg', null, MSG_LEGACY_CLASS],
        ['m-r-n-md', null, MSG_LEGACY_CLASS],
        ['m-r-n-sm', null, MSG_LEGACY_CLASS],
        ['m-r-n-xl', null, MSG_LEGACY_CLASS],
        ['m-r-n-xs', null, MSG_LEGACY_CLASS],
        ['m-r-n-xxs', null, MSG_LEGACY_CLASS],
        ['m-r-none', null, MSG_LEGACY_CLASS],
        ['m-r-sm', null, MSG_LEGACY_CLASS],
        ['m-r-xl', null, MSG_LEGACY_CLASS],
        ['m-r-xs', null, MSG_LEGACY_CLASS],
        ['m-r-xxs', null, MSG_LEGACY_CLASS],
        ['m-sm', null, MSG_LEGACY_CLASS],
        ['m-t', null, MSG_LEGACY_CLASS],
        ['m-t-lg', null, MSG_LEGACY_CLASS],
        ['m-t-md', null, MSG_LEGACY_CLASS],
        ['m-t-n', null, MSG_LEGACY_CLASS],
        ['m-t-n-lg', null, MSG_LEGACY_CLASS],
        ['m-t-n-md', null, MSG_LEGACY_CLASS],
        ['m-t-n-sm', null, MSG_LEGACY_CLASS],
        ['m-t-n-xl', null, MSG_LEGACY_CLASS],
        ['m-t-n-xs', null, MSG_LEGACY_CLASS],
        ['m-t-n-xxs', null, MSG_LEGACY_CLASS],
        ['m-t-none', null, MSG_LEGACY_CLASS],
        ['m-t-sm', null, MSG_LEGACY_CLASS],
        ['m-t-xl', null, MSG_LEGACY_CLASS],
        ['m-t-xs', null, MSG_LEGACY_CLASS],
        ['m-t-xxs', null, MSG_LEGACY_CLASS],
        ['m-xl', null, MSG_LEGACY_CLASS],
        ['m-xs', null, MSG_LEGACY_CLASS],
        ['m-xxs', null, MSG_LEGACY_CLASS],
        ['mail-attachment', null, MSG_LEGACY_CLASS],
        ['mail-body', null, MSG_LEGACY_CLASS],
        ['mail-box', null, MSG_LEGACY_CLASS],
        ['mail-box-header', null, MSG_LEGACY_CLASS],
        ['mail-date', null, MSG_LEGACY_CLASS],
        ['mail-ontact', null, MSG_LEGACY_CLASS],
        ['mail-search', null, MSG_LEGACY_CLASS],
        ['mail-text', null, MSG_LEGACY_CLASS],
        ['mailbox-content', null, MSG_LEGACY_CLASS],
        ['middle-box', null, MSG_LEGACY_CLASS],
        ['mini-navbar', null, MSG_LEGACY_CLASS],
        ['minimalize-styl-2', null, MSG_LEGACY_CLASS],
        ['nav-header', null, MSG_LEGACY_CLASS],
        ['nav-label', null, MSG_LEGACY_CLASS],
        ['nav-second-level', null, MSG_LEGACY_CLASS],
        ['nav-third-level', null, MSG_LEGACY_CLASS],
        ['navbar-form-custom', null, MSG_LEGACY_CLASS],
        ['navbar-static-side', null, MSG_LEGACY_CLASS],
        ['navbar-top-links', null, MSG_LEGACY_CLASS],
        ['navy-bg', null, MSG_LEGACY_CLASS],
        ['no-borders', null, MSG_LEGACY_CLASS],
        ['no-margins', null, MSG_LEGACY_CLASS],
        ['no-padding', null, MSG_LEGACY_CLASS],
        ['no-top-border', null, MSG_LEGACY_CLASS],
        ['noUi-connect', null, MSG_LEGACY_CLASS],
        ['note-editor', null, MSG_LEGACY_CLASS],
        ['note-toolbar', null, MSG_LEGACY_CLASS],
        ['notes', null, MSG_LEGACY_CLASS],
        ['onoffswitch', null, MSG_LEGACY_CLASS],
        ['onoffswitch-checkbox', null, MSG_LEGACY_CLASS],
        ['onoffswitch-inner', null, MSG_LEGACY_CLASS],
        ['onoffswitch-label', null, MSG_LEGACY_CLASS],
        ['onoffswitch-switch', null, MSG_LEGACY_CLASS],
        ['p-lg', null, MSG_LEGACY_CLASS],
        ['p-m', null, MSG_LEGACY_CLASS],
        ['p-md', null, MSG_LEGACY_CLASS],
        ['p-sm', null, MSG_LEGACY_CLASS],
        ['p-xl', null, MSG_LEGACY_CLASS],
        ['p-xs', null, MSG_LEGACY_CLASS],
        ['p-xxs', null, MSG_LEGACY_CLASS],
        ['pace', null, MSG_LEGACY_CLASS],
        ['pace-done', null, MSG_LEGACY_CLASS],
        ['pace-inactive', null, MSG_LEGACY_CLASS],
        ['pace-progress', null, MSG_LEGACY_CLASS],
        ['page-heading', null, MSG_LEGACY_CLASS],
        ['photos', null, MSG_LEGACY_CLASS],
        ['profile-content', null, MSG_LEGACY_CLASS],
        ['profile-element', null, MSG_LEGACY_CLASS],
        ['progress-bar-navy-light', null, MSG_LEGACY_CLASS],
        ['progress-mini', null, MSG_LEGACY_CLASS],
        ['progress-small', null, MSG_LEGACY_CLASS],
        ['project-actions', null, MSG_LEGACY_CLASS],
        ['project-files', null, MSG_LEGACY_CLASS],
        ['project-list', null, MSG_LEGACY_CLASS],
        ['project-manager', null, MSG_LEGACY_CLASS],
        ['project-people', null, MSG_LEGACY_CLASS],
        ['project-title', null, MSG_LEGACY_CLASS],
        ['read', null, MSG_LEGACY_CLASS],
        ['red-bg', null, MSG_LEGACY_CLASS],
        ['search-choice', null, MSG_LEGACY_CLASS],
        ['search-form', null, MSG_LEGACY_CLASS],
        ['search-link', null, MSG_LEGACY_CLASS],
        ['search-result', null, MSG_LEGACY_CLASS],
        ['show-grid', null, MSG_LEGACY_CLASS],
        ['sidebar-content', null, MSG_LEGACY_CLASS],
        ['sidebard-panel', null, MSG_LEGACY_CLASS],
        ['slidedown', null, MSG_LEGACY_CLASS],
        ['slider_red', null, MSG_LEGACY_CLASS],
        ['small-list', null, MSG_LEGACY_CLASS],
        ['sorting', null, MSG_LEGACY_CLASS],
        ['sorting_asc', null, MSG_LEGACY_CLASS],
        ['sorting_asc_disabled', null, MSG_LEGACY_CLASS],
        ['sorting_desc', null, MSG_LEGACY_CLASS],
        ['sorting_desc_disabled', null, MSG_LEGACY_CLASS],
        ['space-15', null, MSG_LEGACY_CLASS],
        ['space-20', null, MSG_LEGACY_CLASS],
        ['space-25', null, MSG_LEGACY_CLASS],
        ['space-30', null, MSG_LEGACY_CLASS],
        ['special_link', null, MSG_LEGACY_CLASS],
        ['spinner-buttons', null, MSG_LEGACY_CLASS],
        ['star-mail', null, MSG_LEGACY_CLASS],
        ['stat-list', null, MSG_LEGACY_CLASS],
        ['stat-percent', null, MSG_LEGACY_CLASS],
        ['statistic-box', null, MSG_LEGACY_CLASS],
        ['style1', null, MSG_LEGACY_CLASS],
        ['table-mail', null, MSG_LEGACY_CLASS],
        ['tag-item', null, MSG_LEGACY_CLASS],
        ['tag-list', null, MSG_LEGACY_CLASS],
        ['tag-title', null, MSG_LEGACY_CLASS],
        ['text-box', null, MSG_LEGACY_CLASS],
        ['text-navy', null, MSG_LEGACY_CLASS],
        ['text-uppercase', null, MSG_LEGACY_CLASS],
        ['timeline-item', null, MSG_LEGACY_CLASS],
        ['title-action', null, MSG_LEGACY_CLASS],
        ['todo-completed', null, MSG_LEGACY_CLASS],
        ['todo-list', null, MSG_LEGACY_CLASS],
        ['ui-calendar', null, MSG_LEGACY_CLASS],
        ['ui-tab', null, MSG_LEGACY_CLASS],
        ['unread', null, MSG_LEGACY_CLASS],
        ['unstyled', null, MSG_LEGACY_CLASS],
        ['vertical-align', null, MSG_LEGACY_CLASS],
        ['welcome-message', null, MSG_LEGACY_CLASS],
        ['white-bg', null, MSG_LEGACY_CLASS],
        ['widget', null, MSG_LEGACY_CLASS],
        ['widget-head-color-box', null, MSG_LEGACY_CLASS],
        ['widget-text-box', null, MSG_LEGACY_CLASS],
        ['wrapper', null, MSG_LEGACY_CLASS],
        ['wrapper-content', null, MSG_LEGACY_CLASS],
        ['yellow-bg', null, MSG_LEGACY_CLASS],
        ['control-placeholder-label', null, MSG_LEGACY_CLASS],
        ['bb-toolbar-btn', null, MSG_LEGACY_CLASS],
        ['bb-toolbar-btn-icon', null, MSG_LEGACY_CLASS],
        ['bb-tab-header-count-responsive', null, MSG_LEGACY_CLASS],
        ['bb-tab-header-title-responsive', null, MSG_LEGACY_CLASS],
        ['bb-tab-header-chevron-responsive', null, MSG_LEGACY_CLASS],
        ['row-container', null, MSG_LEGACY_CLASS],

        // Legacy classes with replacements
        ['badge-danger', 'bb-badge-danger'],
        ['badge-info', 'bb-badge-info'],
        ['badge-primary', 'bb-badge-primary'],
        ['badge-success', 'bb-badge-success'],
        ['badge-warning', 'bb-badge-warning'],
        ['btn-white', 'bb-btn-secondary'],
        ['ibox', 'bb-tile'],
        ['ibox-content', 'bb-tile-content'],
        ['ibox-heading', 'bb-tile-heading'],
        ['ibox-title', 'bb-tile-title'],
        ['ibox-tools', 'bb-tile-tools'],
        ['no-records', 'bb-no-records']
    ];

    deprecatedDirectives = [
        ['error-type', 'bb-error-type'],
        ['ui-select', 'bb-select-field'],
        ['bb-autofocus'],
        ['bb-chart-scatterplot'],
        ['bb-date-field', 'bb-datepicker'],
        ['bb-helpwidget', null, 'Use the "bbHelp" service instead to show the help panel from a controller.'],
        ['bb-money-input', 'bb-autonumeric'],
        ['bb-tab', null, 'Use the Angular UI Bootstrap "tabset" directive along with the "bb-tab-scroll" and "bb-tab-sref" directives if needed.'],
        ['bb-tooltip', null, 'Use the Angular UI Bootstrap uib-tooltip-template directive and add quotes around the template URI to make it a string literal'],
        ['dropdown', 'uib-dropdown'],
        ['dropdown-toggle', 'uib-dropdown-toggle'],
        ['accordion', 'uib-accordion'],
        ['accordion-group', 'uib-accordion-group'],
        ['accordion-heading', 'uib-accordion-heading'],
        ['datepicker-popup', 'uib-datepicker-popup'],
        ['collapse', 'uib-collapse'],
        ['pagination', 'uib-pagination'],
        ['tabset', 'uib-tabset'],
        ['tab', 'uib-tab'],
        ['tab-heading', 'uib-tab-heading'],
        ['alert', 'uib-alert'],
        ['datepicker', 'uib-datepicker'],
        ['popover-template', 'uib-popover-template'],
        ['popover-html', 'uib-popover-html'],
        ['popover', 'uib-popover'],
        ['progress', 'uib-progress'],
        ['bar', 'uib-bar'],
        ['progressbar', 'uib-progressbar'],
        ['rating', 'uib-rating'],
        ['timepicker', 'uib-timepicker'],
        ['tooltip', 'uib-tooltip'],
        ['tooltip-html', 'uib-tooltip-html'],
        ['typeahead', 'uib-typeahead'],
        ['typeahead-popup', 'uib-typeahead-popup'],
        ['typeahead-match', 'uib-typeahead-match']

    ];

    function getElText(el) {
        var text = [];

        el.each(function () {
            text.push(el.clone().text('...')[0].outerHTML);
        });

        return '\n    ' + text.join('    \n');
    }

    function createError(code, message) {
        return {
            code: code,
            message: message
        };
    }

    function findDeprecatedDirectives(el, msgs) {
        var deprecatedDirective,
            deprecatedEls,
            i,
            msg,
            n;

        for (i = 0, n = deprecatedDirectives.length; i < n; i++) {
            deprecatedDirective = deprecatedDirectives[i];

            deprecatedEls = el.find(deprecatedDirective[0] + ', [' + deprecatedDirective[0] + ']');

            if (deprecatedEls.length > 0) {
                msg = 'The directive "' + deprecatedDirective[0] + '" is deprecated.';

                switch (deprecatedDirective.length) {
                    case 3:
                        msg += '  ' + deprecatedDirective[2];
                        break;
                    case 2:
                        msg += '  Use "' + deprecatedDirective[1] + '" instead.';
                        break;
                }

                msg += getElText(deprecatedEls);

                msgs.push(createError('E0001', msg));
            }
        }
    }

    function findDeprecatedClasses(el, msgs) {
        var deprecatedClass,
            deprecatedClassName,
            deprecatedEls,
            msg,
            i,
            n;

        for (i = 0, n = deprecatedClasses.length; i < n; i++) {
            deprecatedClass = deprecatedClasses[i];
            deprecatedClassName = deprecatedClass[0];

            deprecatedEls = el.find('.' + deprecatedClassName + ', [ng-class*=\'\\\'' + deprecatedClassName + '\\\'\']');

            if (deprecatedEls.length > 0) {
                msg = 'The class "' + deprecatedClassName + '" is deprecated.';

                switch (deprecatedClass.length) {
                    case 3:
                        msg += '  ' + deprecatedClass[2];
                        break;
                    case 2:
                        msg += '  Use "' + deprecatedClass[1] + '" instead.';
                        break;
                }

                msg += getElText(deprecatedEls);

                msgs.push(
                    createError(
                        'E0002',
                        msg
                    )
                );
            }
        }
    }

    function findDeprecatedClassesInScss(el, msgs) {
        var i,
            sassFile = el.html(),
            deprecatedClass,
            msg,
            deprecatedNdx,
            nextCharNdx,
            nextChar;

        for (i = 0; i < deprecatedClasses.length; i++) {
            deprecatedClass = deprecatedClasses[i];
            deprecatedNdx = sassFile.indexOf(('.' + deprecatedClass[0]));
            if (deprecatedNdx > -1) {
                nextCharNdx = deprecatedNdx + deprecatedClass[0].length + 1;
                nextChar = sassFile[nextCharNdx];
                if (nextChar === ' ' || nextChar === '+' || nextChar === '{' || nextChar === ':' || nextChar === '\n' || nextChar === '\r') {
                    msg = 'The class "' + deprecatedClass[0] + '" is deprecated.' + ' Next char: ' + nextChar + '.';

                    switch (deprecatedClass.length) {
                        case 3:
                            msg += '  ' + deprecatedClass[2];
                            break;
                        case 2:
                            msg += '  Use "' + deprecatedClass[1] + '" instead.';
                            break;
                    }

                    msgs.push(
                        createError(
                            'E0004',
                            msg
                        )
                    );
                }

            }
        }

    }

    function findDeprecatedSassVariables(el, msgs) {
        var i,
            sassFile = el.html(),
            deprecatedVariable,
            msg;

        for (i = 0; i < deprecatedSassVariables.length; i++) {
            deprecatedVariable = deprecatedSassVariables[i];

            if (sassFile.indexOf(deprecatedVariable[0]) > -1) {

                msg = 'The variable "' + deprecatedVariable[0] + '" is deprecated.';

                switch (deprecatedVariable.length) {
                    case 3:
                        msg += '  ' + deprecatedVariable[2];
                        break;
                    case 2:
                        msg += '  Use "' + deprecatedVariable[1] + '" instead.';
                        break;
                }

                msgs.push(
                    createError(
                        'E0003',
                        msg
                    )
                );
            }
        }


    }

    // Send messages to the parent PhantomJS process via alert! Good times!!
    function sendMessage() {
        var args = [].slice.call(arguments);
        window.alert(JSON.stringify(args));
    }

    function lintSingle(el) {
        var msgs = [],
            pathName;

        el = $(el);

        pathName = el.data('path');

        if (pathName.indexOf('.scss') > -1) {
            findDeprecatedSassVariables(el, msgs);
            findDeprecatedClassesInScss(el, msgs);
        } else {
            findDeprecatedDirectives(el, msgs);
            findDeprecatedClasses(el, msgs);
        }

        if (msgs.length > 0) {
            sendMessage('skylint.invalid', {
                path: pathName,
                errors: msgs
            });
        }
    }

    function versionCompare(v1, v2) {
        var i,
            v1parts = v1.split('.'),
            v2parts = v2.split('.');

        function isValidPart(x) {
            return /^\d+$/.test(x);
        }

        if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
            return NaN;
        }

        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);

        for (i = 0; i < v1parts.length; ++i) {
            if (v2parts.length === i) {
                return 1;
            }

            if (v1parts[i] !== v2parts[i]) {
                if (v1parts[i] > v2parts[i]) {
                    return 1;
                } else {
                    return -1;
                }
            }
        }

        if (v1parts.length !== v2parts.length) {
            return -1;
        }

        return 0;
    }

    function lintAll() {
        var els,
            minVersion = '0.1.0';

        if (versionCompare(REPORTER_VERSION, minVersion) < 0) {
            sendMessage('skylint.error', 'Your Skylint Grunt task is out of date.  Upgrade your Grunt task to ' + minVersion + ' or later to continue to use Skylint.');
            return;
        }

        try {
            els = $('.thing-to-test');

            sendMessage('skylint.ok', 'Testing ' + els.length + ' file(s)...');

            els.each(function () {
                lintSingle(this);
            });
        } catch (ex) {
            sendMessage('skylint.error', ex.message);
        }
    }

    lintAll();

    sendMessage('skylint.done');
}());
