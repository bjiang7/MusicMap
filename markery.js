  /** 
    * creates markers along a google.maps.DirectionsRoute
    *     
    * @param route object google.maps.DirectionsRoute
    * @param dist  int    interval for milestones in meters
    * @param opts  object google.maps.MarkerOptions  
    * @return array Array populated with created google.maps.Marker-objects
    **/     
  
  function gMilestone(route,dist,opts)
  {
    
    var markers=[],
        geo=google.maps.geometry.spherical,
        path=route.overview_path,
        point=path[0],
        distance=0,
        leg,
        overflow,
        pos;
              
      for(var p=1;p<path.length;++p)
      { 
        leg=Math.round(geo.computeDistanceBetween(point,path[p]));
        d1=distance+0
        distance+=leg;        
        overflow=dist-(d1%dist);
        
        if(distance>=dist && leg>=overflow)
        {
          if(overflow && leg>=overflow)
          { 
            pos=geo.computeOffset(point,overflow,geo.computeHeading(point,path[p]));
            opts.position=pos;
            markers.push(new google.maps.Marker(opts));
            distance-=dist;
          }
          
          while(distance>=dist)
          { 
            pos=geo.computeOffset(point,dist+overflow,geo.computeHeading(point,path[p]));
            opts.position=pos;
            markers.push(new google.maps.Marker(opts));
            distance-=dist;
          }
        }
        point=path[p]
      }
    return markers;    
  }  