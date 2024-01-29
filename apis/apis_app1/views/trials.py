from django.http import HttpResponse
import json
from functools import reduce

def char_counter_tnt(request, ipstr):
    """
    Identifiying the count of each charector and preffixing it to that perticular charector in the same string.
    Like: 2s2h1a1i for shashi or Shashi
    """
    ipstr, data_dict, spl_str = ipstr.lower(), {}, ""
    
    #Counting charector and storing in it in a dict - char counter normal
    for char in ipstr.lower():
        data_dict.update({char: ipstr.count(char)})
    
    #Concatinating count with respective chars using the previously generated dict
    for char, count in data_dict.items():
        spl_str += str(count)+char

    return HttpResponse(spl_str)

def star_design(request):
    design_str = ""
    for i in reversed(range(4)):
        str1 = ""
        for j in range(4):
            if j >= i:
                str1 += "*"
            else:
                str1 += " "
        design_str += str1+"\n"
    return HttpResponse(design_str)

def factorial(request, ipint):
    fact = 1
    for i in range(1, ipint+1):
        fact = fact*i
    return HttpResponse(fact)

def fibbonacci(request, ipint):
    fibbo = []
    for i in range(ipint):
        if i==0 or i==1:
            fibbo.append(i)
        else:
            fibbo.append(fibbo[i-1]+fibbo[i-2])
    return HttpResponse(str(fibbo))
        
def prime_numbers(request, ipint):
    prime_numbers = []
    for i in range(2, ipint):
        is_prime = True
        for j in range(2, i):
            if i>j and i%j == 0: 
                is_prime = False
                break
        if is_prime:
            prime_numbers.append(i)
    return HttpResponse(str(prime_numbers))

def common_values(request):
    data = json.loads(request.body)
    list1 = data["list1"]
    list2 = data["list2"]
    result = set(list1) & set(list2)
    return HttpResponse(str(result))

def uncommon_values(request):
    data = json.loads(request.body)
    list1 = data["list1"]
    list2 = data["list2"]
    result = set(list1) ^ set(list2)
    return HttpResponse(str(result))

def union_values(request):
    data = json.loads(request.body)
    list1 = data["list1"]
    list2 = data["list2"]
    result = set(list1) | set(list2)
    return HttpResponse(str(result))

def unique_pairs(request):
    list1 = json.loads(request.body)["data"]
    result = {}
    for item1 in list1:
        for item2 in list1:
            if item1 != item2 and str(item2)+"-"+str(item1) not in result.keys():
                result.update({ str(item1)+"-"+str(item2): item1+item2 })
    values, keys = list(result.values()), list(result.keys())
    max_num_pair = keys[values.index(max(values))]
    return HttpResponse(str({ max_num_pair: max(values) }))

def sort_list(request):
    list1 = json.loads(request.body)["data"]
    index = len(list1)
    for i in range(index):
        for j in range(i+1, index):
            if list1[i]>list1[j]:
                list1[i], list1[j] = list1[j], list1[i]
    return HttpResponse(str(list1))

def two_highest_nums(request):
    list1 = json.loads(request.body)["data"]
    index = len(list1)
    max1, max2 = 0, 0
    for i in range(index):
        if list1[i] > max1:
            max2 = max1
            max1 = list1[i]
        if list1[i] > max2 and list1[i] < max1:
            max2 = list1[i]

    return HttpResponse(str({"max1": max1, "max2": max2}))

def two_lowest_nums(request):
    list1 = json.loads(request.body)["data"]
    index = len(list1)
    max1, max2 = 0, max(list1)
    for i in range(index):
        if list1[i] < max1:
            max2 = max1
            max1 = list1[i]
        if list1[i] < max2 and list1[i] > max1:
            max2 = list1[i]

    return HttpResponse(str({"max1": max1, "max2": max2}))

def validate_brackets(request, ipstr):
    op_cl_bkts = {"{": "}", "(": ")", "[": "]"}
    temp = []
    for bracket in ipstr:
        if bracket in op_cl_bkts.keys():
            temp.append(bracket)
        else:
            if temp == []:
                break
            else:
                last_bkt = temp.pop()
                if op_cl_bkts[last_bkt] != bracket:
                    break
    return HttpResponse(str({ "is_valid": temp == [] }))

def double_numbers_using_map(request):
    list1 = json.loads(request.body)["data"]
    return HttpResponse(str({ "result":list(map(lambda x:2*x, list1)) }))

def even_numbers_using_filter(request):
    list1 = json.loads(request.body)["data"]
    return HttpResponse(str({ "result": list(filter(lambda x: x%2==0, list1)) }))

def sum_using_reduce(request):
    list1 = json.loads(request.body)["data"]
    return HttpResponse(str({ "result": reduce(lambda x, y: x+y, list1) }))

""" Decorator example starts """
def validate_division(func):
    def validation(*args, **kwargs):
        if kwargs["divisor"] == 0:
            return HttpResponse(str(Exception("Divide by zero exception")), status=400)
        else:
            return func(*args)
    return validation

@validate_division
def divide_number(request, dividend, divisor):
    return HttpResponse(str({"result": round(dividend/divisor, 2)}))
""" Decorator example ends """

def sort_dict_by_key(request):
    data = json.loads(request.body)["data"]
    data_len = len(data)
    for i in range(data_len):
        for j in range(i+1, data_len):
            if data[i]["age"] > data[j]["age"]:
                data[i], data[j] = data[j], data[i]
    return HttpResponse(str(data))

def sort_string(request, str1):
    str1 = "".join(sorted(str1))
    return HttpResponse(str({ "result1": str1 }))

def sort_single_dict(request, by_value):
    dict1 = json.loads(request.body)["data"]
    values = list(dict1.values())
    keys = list(dict1.keys())
    values1 = list(dict1.values())
    values1.sort(reverse=True)
    
    dict2 = { keys[values.index(x)]: x for x in values1 }

    return HttpResponse(str({ "result": dict2 }))