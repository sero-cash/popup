import {storage,keys} from "../../config/common";

class Address {

    add(data){
        if(storage.get(keys.address.info+data.address)){
            throw new Error("Address has in book")
        }else{
            let dataArray = storage.get(keys.address.book);
            if(dataArray){
                dataArray.push(data.address);
            }else{
                dataArray = [data.address]
            }
            storage.set(keys.address.book,dataArray);
            storage.set(keys.address.info+data.address,data);
        }
    }

    set(address){
        storage.set(keys.address.info+address.address,address);
    }

    List(){
       let addressArray =  storage.get(keys.address.book);
       if (addressArray){
           let res = [];
           for(let ad of addressArray){
               let info = storage.get(keys.address.info+ad);
               if (info){
                   res.push(info);
               }
           }
           return res;
       }
       return [];
    }

    info(address){
        return storage.get(keys.address.info+address);
    }

    remove(addr){
        const addresses = storage.get(keys.address.book);
        if (addresses){
            let tmpArray = [];
            for(let address of addresses){
                if (address === addr){
                }else{
                    tmpArray.push(address);
                }
            }
            storage.delete(keys.address.info+addr)
            storage.set(keys.address.book,tmpArray);
        }
    }

}

export default Address