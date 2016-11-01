/*jshint unused: false */
/*global angular */

(function () {
'use strict';

var bbResourcesOverrides;

bbResourcesOverrides = {"action_bar_actions":"Acties","alert_close":"Sluiten","autonumeric_abbr_billions":"b","autonumeric_abbr_millions":"m","autonumeric_abbr_thousands":"k","avatar_error_not_image_description":"Kies een bestand dat een geldige afbeelding is.","avatar_error_not_image_title":"Bestand is geen afbeelding.","avatar_error_too_large_description":"Kies een afbeelding die kleiner is dan {0}.","avatar_error_too_large_title":"Bestand is te groot.","carousel_button_label_next":"Naar volgend item","carousel_button_label_previous":"Naar vorig item","carousel_dot_label":"Naar item {0}","checklist_select_all":"Alles selecteren","checklist_clear_all":"Alles wissen","checklist_only_selected_items":"Alleen geselecteerde items weergeven","checklist_no_items":"Geen items gevonden","checklist_check_title":"Selecteer item","checklist_search_label":"Zoeken","checklist_categories_label":"Categorieën","chevron_collapse":"Samenvouwen","chevron_expand":"Openvouwen","context_menu_default_label":"Snelmenu","definition_list_none_found":"Niets gevonden","grid_back_to_top":"Terug naar boven","grid_column_picker_all_categories":"Alle categorieën","grid_column_picker_description_header":"Beschrijving","grid_column_picker_header":"Kies kolommen om in de lijst weer te geven","grid_column_picker_name_header":"Kolom","grid_column_picker_search_placeholder":"Zoeken op naam","grid_column_picker_submit":"Wijzigingen toepassen","grid_columns_button":" Kolommen kiezen","grid_filters_apply":"Filters toepassen","grid_filters_button":"Filters","grid_filters_clear":"Wissen","grid_filters_header":"Filter","grid_filters_hide":"Verbergen","grid_filters_summary_header":"Filter:","grid_load_more":"Meer laden","grid_search_placeholder":"Zoeken in deze lijst","grid_column_picker_search_no_columns":"Geen kolommen gevonden","infinite_scroll_load_more":"Meer laden","modal_footer_cancel_button":"Annuleren","modal_footer_primary_button":"Opslaan","month_short_april":"Apr","month_short_august":"Aug","month_short_december":"Dec","month_short_february":"Feb","month_short_january":"Jan","month_short_july":"Jul","month_short_june":"Jun","month_short_march":"Mrt","month_short_may":"Mei","month_short_november":"Nov","month_short_october":"Okt","month_short_september":"Sep","page_noaccess_button":"Terug naar ongeclassificeerde pagina","page_noaccess_description":"U bent niet bevoegd om deze pagina te openen.\nNeem contact op met de systeembeheerder als dit volgens u niet juist is.","page_noaccess_header":"Ga door, geen bijzonderheden hier","text_expand_see_less":"Minder weergeven","text_expand_see_more":"Meer weergeven","text_expand_modal_title":"Uitgebreide weergave","text_expand_close_text":"Sluiten","grid_action_bar_clear_selection":"Selectie wissen","grid_action_bar_cancel_mobile_actions":"Annuleren","grid_action_bar_choose_action":"Kies een actie","date_field_invalid_date_message":"Voer een geldige datum in","date_range_picker_this_week":"Deze week","date_range_picker_last_week":"Vorige week","date_range_picker_next_week":"Volgende week","date_range_picker_this_month":"Deze maand","date_range_picker_last_month":"Vorige maand","date_range_picker_next_month":"Volgende maand","date_range_picker_this_calendar_year":"Dit kalenderjaar","date_range_picker_last_calendar_year":"Vorig kalenderjaar","date_range_picker_next_calendar_year":"Volgend kalenderjaar","date_range_picker_this_fiscal_year":"Dit fiscale jaar","date_range_picker_last_fiscal_year":"Vorig fiscaal jaar","date_range_picker_next_fiscal_year":"Volgend fiscaal jaar","date_range_picker_this_quarter":"Dit kwartaal","date_range_picker_last_quarter":"Vorig kwartaal","date_range_picker_next_quarter":"Volgend kwartaal","date_range_picker_at_any_time":"Ongeacht tijdstip","date_range_picker_today":"Vandaag","date_range_picker_tomorrow":"Morgen","date_range_picker_yesterday":"Gisteren","date_range_picker_specific_range":"Specifiek bereik","date_range_picker_filter_description_this_week":"{0} voor deze week","date_range_picker_filter_description_last_week":"{0} van vorige week","date_range_picker_filter_description_next_week":"{0} voor volgende week","date_range_picker_filter_description_this_month":"{0} voor deze maand","date_range_picker_filter_description_last_month":"{0} van vorige maand","date_range_picker_filter_description_next_month":"{0} voor volgende maand","date_range_picker_filter_description_this_calendar_year":"{0} voor dit kalenderjaar","date_range_picker_filter_description_last_calendar_year":"{0} van vorig kalenderjaar","date_range_picker_filter_description_next_calendar_year":"{0} voor volgend kalenderjaar","date_range_picker_filter_description_this_fiscal_year":"{0} voor dit fiscale jaar","date_range_picker_filter_description_last_fiscal_year":"{0} van vorig fiscaal jaar","date_range_picker_filter_description_next_fiscal_year":"{0} voor volgend fiscaal jaar","date_range_picker_filter_description_this_quarter":"{0} voor dit kwartaal","date_range_picker_filter_description_last_quarter":"{0} van vorig kwartaal","date_range_picker_filter_description_next_quarter":"{0} voor volgend kwartaal","date_range_picker_filter_description_at_any_time":"{0} ongeacht tijdstip","date_range_picker_filter_description_today":"{0} voor vandaag","date_range_picker_filter_description_yesterday":"{0} van gisteren","date_range_picker_filter_description_tomorrow":"{0} voor morgen","date_range_picker_filter_description_specific_range":"{0} van {1} tot {2}","date_range_picker_from_date":"Datum vanaf","date_range_picker_to_date":"Datum tot","date_range_picker_min_date_error":"Einddatum moet na begindatum vallen","date_range_picker_max_date_error":"Begindatum moet voor einddatum vallen","errormodal_ok":"OK","error_description_broken":"Probeer deze pagina te vernieuwen of probeer het later opnieuw.","error_description_construction":"Dank voor uw geduld terwijl we verbeteringen aanbrengen!\nProbeer het over een tijdje nog een keer.","error_title_broken":"Er is iets misgegaan.","error_title_construction":"Deze pagina is binnenkort weer bereikbaar.","error_title_notfound":"We kunnen die pagina niet openen.","file_size_b_plural":"{0} byte","file_size_b_singular":"{0} byte","file_size_kb":"{0} KB","file_size_mb":"{0} MB","file_size_gb":"{0} GB","file_upload_drag_or_click":"Sleep een bestand hiernaartoe of klik om te bladeren","file_upload_drag_file_here":"Sleep een bestand hiernaartoe","file_upload_drop_files_here":"Zet bestanden hier neer","file_upload_invalid_file":"Dit bestandstype is ongeldig","file_upload_link_placeholder":"http://www.something.com/file","file_upload_or_click_to_browse":"of klik om te bladeren","file_upload_paste_link":"Plak een koppeling naar een bestand","file_upload_paste_link_done":"Gereed","file_upload_link_input":"Voeg een koppeling aan een bestand toe","file_item_delete":"Bestand verwijderen","listbuilder_footer_back_to_top":"Terug naar boven","listbuilder_add_title":"Toevoegen","listbuilder_card_switcher":"Overschakelen op kaartweergave","listbuilder_repeater_switcher":"Overschakelen op herhalerweergave","search_label":"Zoeken naar items","search_open":"Zoekactie openen","search_dismiss":"Zoekactie negeren","search_placeholder":"Zoeken in deze lijst","searchfield_searching":"Bezig met zoeken...","searchfield_no_records":"Geen overeenkomende records gevonden","selectfield_summary_text":"{0} items geselecteerd","selectfield_remove":"Verwijderen","selectfieldpicker_select":"Selecteren","selectfieldpicker_select_value":"Selecteer waarde","selectfieldpicker_select_values":"Selecteer waarden","selectfieldpicker_clear":"Selectie wissen","tile_chevron_label":"Uitvouwen of samenvouwen","wizard_navigator_finish":"Voltooien","wizard_navigator_next":"Volgende","wizard_navigator_previous":"Vorige","datepicker_today":"Vandaag","datepicker_clear":"Wissen","datepicker_close":"Gereed","datepicker_open":"Datumkiezer openen","reorder_top":"Boven","tab_add":"Tabblad toevoegen","tab_open":"Openen","filter_modal_apply":"Filters toepassen","filter_modal_clear":"Alle filters wissen","filter_button_title":"Filters","filter_summary_header":"Filter","filter_summary_close":"Sluiten","sort_menu_heading":"Sorteren op","sort_button_label":"Sorteren","pagination_previous":"Vorige","pagination_next":"Volgende"};

angular.module('sky.resources')
    .config(['bbResources', function (bbResources) {
        angular.extend(bbResources, bbResourcesOverrides);
    }]);
}());
