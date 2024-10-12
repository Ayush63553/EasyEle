
import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'
import haversine from 'haversine-distance';
// import { Dropdown, DropdownButton } from 'react-bootstrap';
export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  // const [btnEnable, setBtnEnable] = useState(false);
  // let totval = 0
  // let price = Object.values(options).map((value) => {
  //   return parseInt(value, 10);
  // });
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  // let Xcord = props.Xcord;
  // let Ycord = props.Ycord;

  const a = { latitude: localStorage.getItem("Xcord"), longitude: localStorage.getItem("Ycord") };
  const b = { latitude: props.Xcord, longitude: props.Ycord };
  
  // console.log(haversine(a, b))

  
  const dispatch = useDispatchCart();
  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login")
    }
  }
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  const handleOptions = (e) => {
    setSize(e.target.value);
  }

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === foodItem._id) {
        food = item;
        break;
      }
    }
    console.log(food)
    console.log(new Date())
    if (food!==[]) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


    // setBtnEnable(true)

  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  // useEffect(()=>{
  // checkBtn();
  //   },[data])

  let finalPrice = Math.round(qty * options[size]*100)/100;   //This is where Price is changing
  // totval += finalPrice;
  // console.log(totval)
  return (
    <div>

      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          
          <p className="card-text">{Math.round(((haversine(a, b))/1000)*10)/10} km from home</p>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
          {(finalPrice!==0)?
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onClick={handleClick} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            : ""
          }
          {(finalPrice!==0)?
            <>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onClick={handleClick} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <br/>
            </>
              : ""
            }
            {(finalPrice!==0)?
            <>
            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
                ₹{finalPrice} (in Lakhs)
            </div>
            </>
            : "Price:(Will depend on the Service)"
            }
          </div>
          <br/>
          {(finalPrice!==0)?<>
          <br/>
          </>
          : ""
          }
          {/* {(localStorage.getItem("token")) ? */}
          <button className={`btn btn-success justify-center ms-2 `} onClick={handleAddToCart}>Book</button>
          {/* : 
          // <button className={`btn btn-success justify-center ms-2 `} onClick={handleClick}>Book</button>
          <div/>
          } */}
          {/* <button className={`btn btn-danger justify-center ms-2 ${btnEnable ? "" : "disabled"}`} onClick={handleRemoveCart}>Remove</button> */}
        </div>
      </div>
    </div>
  )
}
