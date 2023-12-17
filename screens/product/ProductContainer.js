import React, { useEffect, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    StatusBar,
    SafeAreaView,
    Image,
    TextInput,
    ScrollView,
    Dimensions, Platform,
    TouchableOpacity
} from "react-native";

let { height } = Dimensions.get("window");

import ProductList from './ProductList';
import searchedProduct from "./SearchedProduct";

// Icon Import
import { Foundation, Ionicons, Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome'

import CartIcon from '../../components/Cart/CartIcon'
import { WINDOW_HEIGHT } from "../../shared/Dimensions";
import SearchedProduct from "./SearchedProduct";
import Banner from "../../components/Banner";
import CategoryFilter from "./Category/CategoryFilter";
import Loading from '../../components/Loading'

import baseUrl from "../../common/baseUrl";
import axios from "axios";
import { COLOR } from "../../assets/font/color";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "react-native-paper";

const data = require('../../assets/data/products.json');
const productCategories = require('../../assets/data/categories.json');
const flatSale = require('../../assets/data/FlatSale.json');


const ProductContainer = (props) => {

    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productCtg, setProductCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);
    const [loading, setLoading] = useState(true)
    const [pageCurent, setPageCurrent] = useState(0)
    const [totalPages, setTotalPages] = useState(0)




    useFocusEffect((
        useCallback(() => {
            setLoading(true)
            axios.get(`${baseUrl}dishes/pagination?page=${pageCurent}`)
            .then((res) => {
                setPageCurrent(res.data.currentPage)
                setTotalPages(res.data.totalPages)
            })
            .catch((err) => console.log(err))
            
            axios.get(`${baseUrl}categories`)
                .then((res) => {
                    setCategories(res.data)
                    setLoading(false)
                })
                .catch((err) => console.log(err))
            
            
            
            axios.get(`${baseUrl}dishes?page=${pageCurent}`)
                .then((res) => {
                    setProducts(res.data);
                    setProductFiltered(res.data);
                    setFocus(false);
                    setProductCtg(res.data);
                    setActive(-1);
                    setInitialState(res.data);
                })
                .catch((err) => console.log(err))

            return (() => {
                setProducts([]);
                setProductFiltered([]);
                setFocus();
                setCategories([]);
                setActive();
                setInitialState();
            })
        }, [pageCurent])
    ))


    //Product Methods
    const searchProduct = (text) => {
        setProductFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        )
    }
    const openList = () => {
        setFocus(true);
    }
    const onBlur = () => {
        setFocus(false);
    }


    // Categories
    const changeCtg = (ctg) => {
        {
            ctg === "all"
                ? [setProductCtg(initialState), setActive(true)]
                : [
                    setProductCtg(
                        products.filter((i) => i.category._id === ctg),
                        setActive(true)
                    ),
                ];
        }
    };


    //flat Sale product
    const renderFlatSale = ({ item }) => {
        const { image, datetime, voucher } = item;
        return (
            <TouchableOpacity style={{ flex: 1 }} onPress={() => console.log('FlatSale')}>
                <View style={styles.flatProductContainer}>
                    <Image style={styles.image}
                        resizeMode={"cover"}
                        source={{ uri: image ? image : 'https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGZvb2R8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60' }}
                    />
                    <View />
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 20,
                    marginTop: 3
                }}>
                    <FontAwesome5 name="clock" size={18} color="gray" />
                    <Text style={{
                        marginLeft: 5,
                        color: 'gray',
                        fontSize: 13,
                        fontWeight: 'bold'
                    }}>
                        {datetime}
                    </Text>


                    <Foundation style={{ marginLeft: 18 }} name="page-multiple" size={18} color="gray" />
                    <Text style={{
                        marginLeft: 5,
                        color: 'gray',
                        fontSize: 13,
                        fontWeight: 'bold'
                    }}>
                        {voucher}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

    const previousPage = ()=> setPageCurrent(state=>state-=1)
    const nextPage = ()=> setPageCurrent(state=>state+=1)



    return (
        <>
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <SafeAreaView>
                    <View style={styles.upperHeaderPlaceholder} />
                </SafeAreaView>
                <SafeAreaView style={styles.header}>
                    <View style={styles.upperHeader}>
                        <View style={styles.searchContainer}>
                            <Image
                                source={require('../../assets/images/search.png')}
                                style={styles.searchIcon}
                            />
                            <TextInput
                                placeholder="Search product"
                                placeholderTextColor="rgba(255, 255, 255, 0.8)"
                                style={styles.searchInput}
                                onFocus={openList}
                                onChangeText={(text) => searchProduct(text)}
                            />
                            {focus == true ? (
                                <AntDesign name="closecircle" size={16} color="white" onPress={onBlur} style={styles.closeIcon} />
                            ) : null}
                        </View>
                        <TouchableOpacity
                            style={{ height: '100%', justifyContent: 'center', }}
                            onPress={() => props.navigation.navigate("CartScreen")}
                        >
                            <Icon
                                name="shopping-cart"
                                style={styles.cartIcon}
                                size={25}
                            />
                            <CartIcon />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <AntDesign onPress={() => props.navigation.navigate('MessageScreen')} style={styles.avatarIcon} name="message1" size={23} color="white" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.lowerHeader} />
                </SafeAreaView>
            </View>
            {focus == true ? (
                <SearchedProduct
                    productsFiltered={productsFiltered}
                    navigation={props.navigation}
                />
            ) : (
                loading == false ? (
                    <ScrollView style={styles.productMain}>
                        <View style={{ marginTop: -20 }}>
                            <View style={styles.productHome}>
                                <Banner />
                            </View>
                            <View>
                                <CategoryFilter
                                    categories={categories}
                                    categoryFilter={changeCtg}
                                    productCtg={productCtg}
                                    active={active}
                                    setActive={setActive}
                                />
                            </View>

                            {/*flat Sale product*/}
                            <SafeAreaView style={{ heigh: 200 }}>
                                <View style={styles.flatSaleContainer}>
                                    <LinearGradient colors={['rgba(232, 192, 61, 1)', 'rgba(190, 100, 109, 1)']}
                                        style={[styles.contentCard, { marginLeft: -20 }]}
                                        end={{ x: 1, y: 0.5 }}
                                    >
                                        <Text style={{ fontSize: 15, color: 'white' }}>Flat Sale</Text>
                                    </LinearGradient>
                                    <TouchableOpacity>
                                        <Text
                                            //see more
                                            // onPress={}
                                            style={[
                                                styles.contentCard, {
                                                    fontSize: 15,
                                                    color: 'gray',
                                                    marginRight: -35,
                                                    textDecorationLine: 'underline'
                                                }]}>
                                            see more
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{
                                    flex: 1,
                                }}>
                                    <FlatList
                                        style={{ flex: 1 }}
                                        data={flatSale}
                                        renderItem={renderFlatSale}
                                        horizontal={true}
                                        // keyExtractor={item => `${item.id}`}
                                        keyExtractor={item => `${item._id.$oid}`}
                                        showsHorizontalScrollIndicator={false}
                                    />
                                </View>
                            </SafeAreaView>

                            <LinearGradient colors={['rgba(232, 192, 61, 1)', 'rgba(190, 100, 109, 1)']}
                                style={styles.contentCard}
                                end={{ x: 1, y: 0.5 }}
                            >
                                <Text style={{ fontSize: 15, color: 'white' }}>Popular</Text>
                            </LinearGradient>
                            {productCtg.length > 0 ? (
                                <View style={styles.listContainer}>
                                    {productCtg.map((item, index) => {
                                        return (
                                            <ProductList
                                                navigation={props.navigation}
                                                key={item._id}
                                                item={item}
                                            />
                                        )
                                    })}
                                </View>
                            ) : (
                                <View style={styles.errorCtg}>
                                    <Text style={styles.errorTile}>No products found !</Text>
                                </View>
                            )}
                            <View style={styles.paginationBlock}>
                                 <TouchableOpacity 
                                    disabled={pageCurent==1}
                                    onPress={() => previousPage()}
                                 >
                                        <Text
                                            //see more
                                            // onPress={}
                                            style={{
                                                    fontSize: 15,
                                                    padding:10
                                                }}>
                                            <AntDesign name="left" size={18} color="gray" />
                                        </Text>
                                </TouchableOpacity>
                                <Text style={styles.pageCurent}>{pageCurent}</Text>
                                <View style={{height:25, width:1, backgroundColor:"white"}}></View>
                                <LinearGradient colors={['rgba(232, 192, 61, 1)', 'rgba(190, 100, 109, 1)']}
                                style={styles.totalPage}
                                end={{ x: 1, y: 0.5 }}
                                >
                                    <Text style={{ fontSize: 15, color: 'white' }}>{totalPages}</Text>
                                </LinearGradient>
                                  <TouchableOpacity 
                                    disabled={pageCurent==totalPages}
                                    onPress={() => nextPage()}
                                  >
                                        <Text
                                            //see more
                                            // onPress={}
                                            style={{
                                                    marginLeft:10,
                                                    fontSize: 15,
                                                    color: 'gray',
                                                    padding:10
                                                }}>
                                            <AntDesign name="right" size={18} color="gray" />
                                        </Text>
                                </TouchableOpacity>
                               
                               
                            </View>
                        </View>
                    </ScrollView>
                ) : (
                    <Loading />
                )
            )}
        </>
    )
}



export default ProductContainer;

const styles = StyleSheet.create({
    contentCard: {
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        width: 100,
        textAlign: 'center',
        alignItems: "center",
        marginLeft: 10,
        marginTop: 20,
        marginBottom: 5
    },
    bigContainer: {
        flex: 1
    },
    container: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: COLOR.mainColor,
        // height: 400
    },
    listContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
    },
    flatSaleContainer: {
        justifyContent: 'space-between',
        marginHorizontal: 30,
        flexDirection: 'row',
        marginBottom: 20
    },
    errorCtg: {
        padding: 80,
        alignItems: 'center',
        color: 'black',
        height: height / 2,
    },
    errorTile: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
    productHome: {
        backgroundColor: COLOR.mainColor
    },
    upperHeaderPlaceholder: {
        height: 70
    },
    header: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#1e2027',
    },
    scrollViewContent: {
        height: WINDOW_HEIGHT * 2,
        backgroundColor: 'white'
    },
    paddingForHeader: {
        height: 90,
    },
    upperHeader: {
        height: 60,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    lowerHeader: {
        height: 96
    },
    searchIcon: {
        width: 16,
        height: 16,
        marginLeft: 8
    },
    cartIcon: {
        marginHorizontal: 20,
        color: 'white'
    },
    avatarIcon: {
        marginLeft: 10,
        width: 35,
        height: 35,
        marginTop: 10
    },
    searchContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    searchInput: {
        position: 'absolute',
        width: '100%',
        backgroundColor: "rgba(225, 225, 225, 0.3)",
        color: 'white',
        borderRadius: 10,
        padding: 10,
        paddingLeft: 32
    },
    closeIcon: {
        marginLeft: 220,
        marginTop: -12
    },
    productMain: {
        backgroundColor: COLOR.mainColor,
    },
    image: {
        width: 180,
        height: 250,
        top: 5,
        marginBottom: -150,
        borderRadius: 20,
        marginHorizontal: 1
    },
    flatProductContainer: {
        height: 260,
        marginLeft: 10
    },
    paginationBlock:{
        flex:1,
        flexDirection: 'row',
        justifyContent:"center",
        alignItems:"center",
        marginTop:40,
        marginBottom:20
    },
    totalPage:{
        padding: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        width: 50,
        height:30,
        textAlign: 'center',
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,

    },
    pageCurent:{
        padding: 5,
        paddingHorizontal: 5,
        borderRadius: 10,
        width: 50,
        height:30,
        textAlign: 'center',
        alignItems: "center",
        fontSize: 15, color: 'white' ,
    }
});