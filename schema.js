const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

// const customers =[
//     {id:'1', name: 'John Doe', email: 'jdoe@jmail.com', age:33},
//     {id:'2', name: 'Jane Doe', email: 'j2doe@jmail.com', age:13},
//     {id:'3', name: 'Jo Doe', email: 'j3doe@jmail.com', age:43}
// ];

const CustomerType = new GraphQLObjectType({
    name:'Customer',
    fields:() => ({
        id: {type:GraphQLString},
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        age: {type: GraphQLString}
    })
});

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        customer:{
            type:CustomerType,
            args:{
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                // for(let i = 0; i < customers.length;i++){ // for hardcoded data
                //     if(customers[i].id == args.id){
                //         return customers[i];
                //     }
                // }
                return axios.get('http://localhost:3000/customers/' + args.id)
                .then(res => res.data);

            }
        },
        customers:{
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args){
                return customers;
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});
