# -*- coding: utf-8 -*-
"""
Created on Sat Jun  5 00:11:15 2021

@author: user
"""
from AssetData import AssetDataLoader

def test_load_s0_0():
    res = AssetDataLoader().load(id=0, start='2004-07-01', end='2021-03-16')
    assert res is not -1 and res is not -2 and res is not -3
    
def test_load_s0_1():
    res = AssetDataLoader().load(id=0, start=None, end=None)
    assert res is not -1 and res is not -2 and res is not -3
    
    
def test_load_s0_2():
    res = AssetDataLoader().load(id=0, start='2004-07-01', end=None)
    assert res is not -1 and res is not -2 and res is not -3
    
def test_load_s0_3():
    res = AssetDataLoader().load(id=0, start=None, end='2021-03-16')
    assert res is not -1 and res is not -2 and res is not -3
    
def test_load_s1_0():
    res = AssetDataLoader().load(id=None, start='2012-12-31', end='2017-03-30')
    assert res is -1
    
def test_load_s2_0():
    res = AssetDataLoader().load(id=87, start='2011-07-05', end='2019-07-10')
    assert res is -2
   
def test_load_s2_1():
    res = AssetDataLoader().load(id=0, start='2004-07-01', end='2025-08-16')
    assert res is -2

def test_load_s2_2():
    res = AssetDataLoader().load(id=0, start='2000-04-01', end='2021-04-22')
    assert res is -2
    
def test_load_s2_3():
    res = AssetDataLoader().load(id=0, start='2000-04-01', end='2030-09-10')
    assert res is -2
    
def test_load_s3_0():
    res = AssetDataLoader().load(id=0, start='2021-04-01', end='2009-09-10')
    assert res is -3