import { ActionFunction, json, unstable_composeUploadHandlers, unstable_createMemoryUploadHandler, unstable_parseMultipartFormData } from "@remix-run/node";
import { ICar } from "~/components/CarBoxRenew/types";
import { ICarNewImg } from "~/components/Modal/ModalAddCar/types";
import { requireUserSession } from "~/data/auth.server";
import { addCar } from "~/data/db/addCar";
import { editCar } from "~/data/db/editCar";


import { uploadImage } from "~/data/upload.server";

function withCors() {
    const headers = new Headers();
  
    headers.append('Access-Control-Allow-Origin', '*');
  
    headers.append(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, referer-path'
    );
  
    return headers;
  }

export const action: ActionFunction = async ({ request }) => {
    const headers = withCors();
    try {
    const cloneRq = request.clone();
    
    const formDatas = await cloneRq.formData();

    const userLogged = await requireUserSession(request);
    console.log('LOGGED');
    console.log(userLogged);
    if(!userLogged) {
      return 'NOT ALLOWED';
    }
    let uploadHandler;
    let uploadHandler2;
    let comp;
    let formData;
    let fm;
    let file;
    let imgUrl = null;
    let imgUrlVerbrauch = null;
    let noFile = false;
    let file2;

    console.log(formDatas.get('form'));

    if((formDatas.get('form') !== 'pricelist') && 
    (formDatas.get('form') !== 'delete') && 
    (formDatas.get('form') !== 'all_pricelist') &&
    (formDatas.get('form') !== 'delete') &&
    (formDatas.get('form') !== 'delete_car') &&
    (formDatas.get('form') !== 'filter') &&
    (formDatas.get('form') !== 'request')
    )
     {
      
      const fileUploadData = formDatas.get('file-upload') as Blob;

        console.log(fileUploadData.size);
      if(fileUploadData.size > 0) {
      
      uploadHandler = unstable_composeUploadHandlers(
                async ({ name, data }) => {
                    if (name !== "file-upload") {
                        return undefined
                    }
                    const uploadedImage = await uploadImage(data);
                   
                    imgUrl = uploadedImage.secure_url;
                    return uploadedImage.secure_url;
                },
                unstable_createMemoryUploadHandler()
            );

        formData = await unstable_parseMultipartFormData(
            request,
            uploadHandler
          );

        file = formData.get("file-upload") as File;
      }

    }

    if(formDatas.get('form') === 'add_car') {

    const {
        id,
        brand,
        model,
        cover,
        video,
        price,
        tuv,
        type,
        sit_place,
        engine,
        fuel,
        consumption_image,
        firstregistration,
        rate24,
        rate24_anzahlung,
        rate24_schlussrate,
        rate36,
        rate36_anzahlung,
        rate36_schlussrate,
        rate48,
        rate48_anzahlung,
        rate48_schlussrate,
        car_designation,
        ps,
        km,
        color,
        equipment,
        description,
        environment,
        equipments,
        show,
        images
      }: ICarNewImg = Object.fromEntries(formDatas);
      const imgs = formDatas.get('images') === '' ? [] : formDatas.get('images').split(',');
      const eqs = equipments === '' ? [] : equipments.split(',');
      
      console.log()
      console.log(Object.fromEntries(formDatas));

      let psnew = isNaN(parseInt(ps)) ? 0 : parseInt(ps);
      let sit = isNaN(parseInt(sit_place)) ? 0 : parseInt(sit_place);
    

      const newObj: ICarNewImg = {
        brand,
        model,
        price: parseFloat(price),
        ps: psnew,
        engine,
        video,
        rate24,
        rate24_anzahlung,
        rate24_schlussrate,
        rate36,
        rate36_anzahlung,
        rate48,
        rate48_anzahlung,
        rate48_schlussrate,
        car_designation,
        rate36_schlussrate,
        sit_place: sit,
        km,
        fuel,
        firstregistration,
        color,
        consumption_image,
        show: show === 'true' ? true : false,
        equipments: eqs,
        tuv,
        environment,
        equipment,
        description,
        type,
        cover: imgUrl ?? '',
        images: imgs,
      };

      console.log(imgUrlVerbrauch);
      try {
        const result = await addCar(newObj);
        console.log(result)

          return json({
            success: true
          }, {headers});
       
      } catch(e) {
        console.log('HERE')
        console.log(e);
        return json(e);
      }
    } else {
        const { 
            id,
            brand,
            model,
            cover,
            video,
            price,
            rate24,
            rate24_anzahlung,
            rate24_schlussrate,
            rate36,
            rate36_anzahlung,
            rate36_schlussrate,
            rate48,
            rate48_anzahlung,
            rate48_schlussrate,
            car_designation,
            tuv,
            type,
            sit_place,
            engine,
            fuel,
            firstregistration,
            equipments,
            ps,
            km,
            consumption_image,
            color,
            equipment,
            description,
            environment,
            show,
            images
          }: ICarNewImg = Object.fromEntries(formDatas);
          const dc = formDatas.get('compare_images') === '' ? [] : formDatas.get('compare_images').split(',')
          const imgs = formDatas.get('images') === '' ? [] : formDatas.get('images').split(',');
          let psnew = isNaN(parseInt(ps)) ? 0 : parseInt(ps);
          let sit = isNaN(parseInt(sit_place)) ? 0 : parseInt(sit_place);
          const eqs = equipments === '' ? [] : equipments.split(',');

          let newObj: ICarNewImg = {
            id,
            brand,
            model,
            price: parseFloat(price),
            ps: psnew,
            engine,
            video,
            sit_place: sit,
            km,
            fuel,
            car_designation,
            rate24: parseInt(rate24),
            rate24_anzahlung: parseInt(rate24_anzahlung),
            rate24_schlussrate: parseInt(rate24_schlussrate),
            rate36: parseInt(rate36),
            rate36_anzahlung: parseInt(rate36_anzahlung),
            rate36_schlussrate: parseInt(rate36_schlussrate),
            rate48: parseInt(rate48),
            rate48_anzahlung: parseInt(rate48_anzahlung),
            rate48_schlussrate: parseInt(rate48_schlussrate),
            firstregistration,
            color,
            equipments: eqs,
            show: show === 'true' ? true : false,
            tuv,
            environment,
            equipment,
            description,
            type,
            consumption_image,
            cover: imgUrl ?? '',
            images: imgs,
          };
          
          console.log(rate24);
      
          console.log(imgUrlVerbrauch);
          console.log(newObj)
          try {
            const result = await editCar(newObj);
            console.log(result)
            return {
              success: true
            };
          } catch(e) {
            throw e;
          }
    }
    } catch(e) {
        console.log(e);
        return json({
            headers
        });
    }

}