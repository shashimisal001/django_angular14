from django.urls import path
from apis_app.views.page_view import PageView
from apis_app.views.pandas_examples import PandasExamples
import apis_app.views.trials as trial

urlpatterns=[
    path("page/<int:id>", PageView.as_view({'get': 'get_page_content'})),
    path("pandas/json", PandasExamples.as_view({'get': 'pandas_json'})),
    path("pandas/excel", PandasExamples.as_view({'get': 'pandas_excel'})),
    path("char-counter-tnt/<str:ipstr>", trial.char_counter_tnt),
    path("star-design", trial.star_design),
    path("facto/<int:ipint>", trial.factorial),
    path("fibbo/<int:ipint>", trial.fibbonacci),
    path("prime-numbers/<int:ipint>", trial.prime_numbers),
    path("common-values", trial.common_values),
    path("uncommon-values", trial.uncommon_values),
    path("union-values", trial.union_values),
    path("unique-pairs", trial.unique_pairs),
    path("sort-list", trial.sort_list),
    path("two-highest-nums", trial.two_highest_nums),
    path("two-lowest-nums", trial.two_lowest_nums),
    path("validate-brackets/<str:ipstr>", trial.validate_brackets),
    path("double-numbers", trial.double_numbers_using_map),
    path("even-numbers", trial.even_numbers_using_filter),
    path("sum", trial.sum_using_reduce),
    path("divide/<int:dividend>/<int:divisor>", trial.divide_number),
    path("sort-dict", trial.sort_dict_by_key),
    path("sort-string/<str:str1>", trial.sort_string),
    path("sort-single-dict/<int:by_value>", trial.sort_single_dict)
]
