import React from 'react';
import classes from './app.module.css';
import ProductData from './metaData'



class App extends React.Component
{
  
  productData=ProductData;

  state={
    currentColor:0,
    activePreview:"https://imgur.com/iOeUBV7.png",
    currTime:null,
    timeVisible:true,
    bpmVisible:false,
  }
    
  bpm=Math.floor(Math.random()*(82-68)+68);


  time=setInterval(() => {
    var time=new Date();

    var hour=time.getHours();
    hour<10?hour=`0${hour}`:hour=hour+0;
    
    var min=time.getMinutes();
    min<10?min=`0${min}`:min=min+0;

    var sec=time.getSeconds();
    sec<10?sec=`0${sec}`:sec=sec+0;

    this.setState({currTime:`${hour}:${min}:${sec}`});
  }, 1000)
  

  onColorClick=(item,pos)=>{
    this.setState({activePreview:item.imageUrl , currentColor:pos})
  }

  onFeatureClick=(item)=>
  {
    console.log(item)
    
    item==="Time"?this.setState({timeVisible:true,bpmVisible:false}):this.setState({bpmVisible:true,timeVisible:false})
    
  }

  render(){
    return(
      <div className={classes.App}>

      <header className={classes.header}>
        <img src="https://images-na.ssl-images-amazon.com/images/G/01/gc/designs/livepreview/amazon_dkblue_noto_email_v2016_us-main._CB468775337_.png" alt="logo"></img>
      </header>

      <div className={classes.container}>
            <div className={classes.preview}>
              <img src={this.state.activePreview} alt="preview"></img>
              {this.state.timeVisible?<span className={classes.timer}>{this.state.currTime}</span>:null}
              
              {this.state.bpmVisible?<div className={classes.bpm}>
                                        <i className={["fas","fa-heartbeat"].join(" ")}></i>
                                        <p className={classes.heartRate}>{this.bpm}</p>
                                      </div>:null}
              

            </div>

            <div className={classes.data}>
              
              <h1 className={classes.heading}>{this.productData.title}</h1>
              <p>{this.productData.description}</p>
              <h2 className={classes.heading}>Select Color</h2>
                
              {this.productData.colorOptions.map((item,pos)=>{
                return(<img className={[classes.colors,this.state.currentColor===pos?classes.active:null].join(" ")} src={item.imageUrl} alt="Available Colors" onClick={()=>{this.onColorClick(item,pos)}} key={pos}/>)
              })}
                <br></br>
              {this.productData.featureList.map((feature,pos)=>{
                return(<button className={classes.btnFeatures} key={pos} onClick={()=>this.onFeatureClick(feature)}>{feature}</button>)
              })}
                <br></br>
              <button className={classes.buy}>BUY NOW</button>

            </div>
      </div>
    </div>
    )
  }

}


export default App;
