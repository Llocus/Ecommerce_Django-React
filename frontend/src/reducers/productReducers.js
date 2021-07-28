import { 
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,

    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,

    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,

 } from '../constants/productConstants'


export const productListReducer = (state ={products:[]}, actions) => {
    switch(actions.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true, products:[]}

        case PRODUCT_LIST_SUCCESS:
            return {
                loading:false, 
                products: actions.payload.products, 
                page: actions.payload.page, 
                pages: actions.payload.pages 
            }

        case PRODUCT_LIST_FAIL:
            return {loading:false, error: actions.payload}
        
        default:
            return state
    }
}

export const productDetailsReducer = (state = { product: {reviews:[]}}, actions) => {
    switch(actions.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true, ...state}

        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false, product: actions.payload }

        case PRODUCT_DETAILS_FAIL:
            return {loading:false, error: actions.payload}
        
        default:
            return state
    }
}

export const productDeleteReducer = (state = {}, actions) => {
    switch(actions.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true}

        case PRODUCT_DELETE_SUCCESS:
            return {loading:false, success:true }

        case PRODUCT_DELETE_FAIL:
            return {loading:false, error: actions.payload}
        
        default:
            return state
    }
}

export const productCreateReducer = (state = {}, actions) => {
    switch(actions.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true}

        case PRODUCT_CREATE_SUCCESS:
            return {loading:false, success:true, product:actions.payload }

        case PRODUCT_CREATE_FAIL:
            return {loading:false, error: actions.payload}
        
        case PRODUCT_CREATE_RESET:
            return {}

        default:
            return state
    }
}

export const productUpdateReducer = (state = {product:{}}, actions) => {
    switch(actions.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true}

        case PRODUCT_UPDATE_SUCCESS:
            return {loading:false, success:true, product:actions.payload }

        case PRODUCT_UPDATE_FAIL:
            return {loading:false, error: actions.payload}
        
        case PRODUCT_UPDATE_RESET:
            return {product: {}}

        default:
            return state
    }
}

export const productReviewCreateReducer = (state = {}, actions) => {
    switch(actions.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading:true}

        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading:false, success:true}

        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading:false, error: actions.payload}
        
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}

        default:
            return state
    }
}

export const productTopRatedReducer = (state = {products:[]}, actions) => {
    switch(actions.type){
        case PRODUCT_TOP_REQUEST:
            return {loading:true, products: []}

        case PRODUCT_TOP_SUCCESS:
            return {loading:false, products: actions.payload}

        case PRODUCT_TOP_FAIL:
            return {loading:false, error: actions.payload}

        default:
            return state
    }
}