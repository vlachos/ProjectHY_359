package DB;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author spiro_000
 */
public class Shop {
  private String name;
  private String category;
  private String details;
  private String lng;
  private String lat;
  private String address;
  
  public Shop(){
      
  }
  
  public void setName(String name){
      this.name = name;
  }
  public String getName(){
      return this.name;
  }
  
  public void setCategory(String category){
      this.category = category;
  }
  public String getCategory(){
      return this.category;
  }
  
  public void setDetails(String details){
      this.details = details;
  }
  public String getDetails(){
      return this.details;
  }
  
  public void setLng(String lng){
      this.lng = lng;
  }
  public String getLng(){
      return this.lng;
  }
  
  public void setLat(String lat){
      this.lat = lat;
  }
  public String getLat(){
      return this.lat;
  }
  
  public void setAddress(String address){
      this.address = address;
  }
  public String getAddress(){
      return this.address;
  }
  
  @Override
  public String toString() {
    String str = null;
    str = "Name: " + name + "\n" + 
          "Category: " + category + "\n" +
          "Details: " + details + "\n" + 
          "Coordinates: " + lng + "," + lat + "\n" + 
          "Address: " +  address + "\n"; 
    
    return str;
  }
}
