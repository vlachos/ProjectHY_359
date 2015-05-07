/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Parser;

import DB.Shop;
import DB.DBOperations;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.regex.Pattern;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;
import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;
 

/**
 * The Handler for SAX Events.
 */
public class SAXHandler extends DefaultHandler {
  
  private List<Shop> shopList = new ArrayList<>();
  private Shop shop = null;
  private String content = null;
  
  @Override
  //Triggered when the start of tag is found.
  public void startElement(String uri, String localName, String qName, Attributes attributes) throws SAXException {

    switch(qName){
      //Create a new Employee object when the start tag is found
      case "result":
        shop = new Shop();
        shop.setName(attributes.getValue("name"));
        break;
    }
  }
  
  public ArrayList<Shop> GetShopsInArrayListFromXML(){
    SAXParserFactory parserFactor = SAXParserFactory.newInstance();
    SAXParser parser = null;
      try {
          parser = parserFactor.newSAXParser();
      } catch (ParserConfigurationException | SAXException ex) {
          Logger.getLogger(SAXHandler.class.getName()).log(Level.SEVERE, null, ex);
      }
    SAXHandler handler = new SAXHandler();

    InputStream input; 
    for(int i=1; i<103; ++i){
      try {
          input = new FileInputStream("xml/Google_shops_xml/xml ("+Integer.toString(i)+").xml");
          parser.parse(input,handler);
      } catch (FileNotFoundException ex) {
          Logger.getLogger(SAXHandler.class.getName()).log(Level.SEVERE, null, ex);
      } catch (IOException ex) {
          Logger.getLogger(SAXHandler.class.getName()).log(Level.SEVERE, null, ex);
      } catch (SAXException ex) {
           Logger.getLogger(DBOperations.class.getName()).log(Level.SEVERE, null, ex);
       }
    }
    
    return (ArrayList<Shop>) handler.shopList;
  }
  
  public void printShopsFromXML(){
    
    for(Shop sh : this.GetShopsInArrayListFromXML()){
        System.out.println(sh);
    }
  }
  
  @Override
  public void endElement(String uri, String localName, String qName) throws SAXException {
   switch(qName){
     //Add the employee to list once end tag is found
     case "result":
       shopList.add(shop);
       break;
     //For all other end tags the employee has to be updated.
     case "name":
       shop.setName(content);
       break;
     case "type" :
       shop.getCategory().add(content);
       break;
     case "lng":
        shop.setLng(content);
       break;
     case "lat":
         shop.setLat(content);
         break;
     case "vicinity":
         if(content!=null)
            shop.setAddress(content);
         break;
   }
  }

  @Override
  public void characters(char[] ch, int start, int length)throws SAXException {
      
    content = String.copyValueOf(ch, start, length).trim();
  }
}


