<?php

class Admin_ThemesController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        // action body
    }
    
    public function getimagesAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        //echo '{"images":[{"name":"dance_fever.jpg","size":2067,"lastmod":1305726560000,"url":"images\/dance_fever.jpg"},{"name":"gangster_zack.jpg","size":2115,"lastmod":1305726560000,"url":"images\/gangster_zack.jpg"},{"name":"kids_hug.jpg","size":2477,"lastmod":1305726560000,"url":"images\/kids_hug.jpg"},{"name":"kids_hug2.jpg","size":2476,"lastmod":1305726560000,"url":"images\/kids_hug2.jpg"},{"name":"sara_pink.jpg","size":2154,"lastmod":1305726560000,"url":"images\/sara_pink.jpg"},{"name":"sara_pumpkin.jpg","size":2588,"lastmod":1305726560000,"url":"images\/sara_pumpkin.jpg"},{"name":"sara_smile.jpg","size":2410,"lastmod":1305726560000,"url":"images\/sara_smile.jpg"},{"name":"up_to_something.jpg","size":2120,"lastmod":1305726560000,"url":"images\/up_to_something.jpg"},{"name":"zack.jpg","size":2901,"lastmod":1305726560000,"url":"images\/zack.jpg"},{"name":"zacks_grill.jpg","size":2825,"lastmod":1305726560000,"url":"images\/zacks_grill.jpg"},{"name":"zack_dress.jpg","size":2645,"lastmod":1305726560000,"url":"images\/zack_dress.jpg"},{"name":"zack_hat.jpg","size":2323,"lastmod":1305726560000,"url":"images\/zack_hat.jpg"},{"name":"zack_sink.jpg","size":2303,"lastmod":1305726560000,"url":"images\/zack_sink.jpg"}]}';die;
        
        $dir = $_SERVER['DOCUMENT_ROOT']."/assets/js/ExtJs/plugins/themes/images/thumbs/";
        $images = array();
        $d = dir($dir);
        while($name = $d->read()){
            if(!preg_match('/\.(jpg|gif|png)$/', $name)) continue;
            $size = filesize($dir.$name);
            $lastmod = filemtime($dir.$name)*1000;
            $images[] = array('name'=>$name, 'size'=>$size,
        			'lastmod'=>$lastmod, 'url'=>"http://www.society.local/assets/js/ExtJs/plugins/themes/images/thumbs/".$name);
        }
        $d->close();
        $o = array('images'=>$images);
        echo json_encode($o);
    }
    
    public function getthemesAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        //echo '{"images":[{"name":"dance_fever.jpg","size":2067,"lastmod":1305726560000,"url":"images\/dance_fever.jpg"},{"name":"gangster_zack.jpg","size":2115,"lastmod":1305726560000,"url":"images\/gangster_zack.jpg"},{"name":"kids_hug.jpg","size":2477,"lastmod":1305726560000,"url":"images\/kids_hug.jpg"},{"name":"kids_hug2.jpg","size":2476,"lastmod":1305726560000,"url":"images\/kids_hug2.jpg"},{"name":"sara_pink.jpg","size":2154,"lastmod":1305726560000,"url":"images\/sara_pink.jpg"},{"name":"sara_pumpkin.jpg","size":2588,"lastmod":1305726560000,"url":"images\/sara_pumpkin.jpg"},{"name":"sara_smile.jpg","size":2410,"lastmod":1305726560000,"url":"images\/sara_smile.jpg"},{"name":"up_to_something.jpg","size":2120,"lastmod":1305726560000,"url":"images\/up_to_something.jpg"},{"name":"zack.jpg","size":2901,"lastmod":1305726560000,"url":"images\/zack.jpg"},{"name":"zacks_grill.jpg","size":2825,"lastmod":1305726560000,"url":"images\/zacks_grill.jpg"},{"name":"zack_dress.jpg","size":2645,"lastmod":1305726560000,"url":"images\/zack_dress.jpg"},{"name":"zack_hat.jpg","size":2323,"lastmod":1305726560000,"url":"images\/zack_hat.jpg"},{"name":"zack_sink.jpg","size":2303,"lastmod":1305726560000,"url":"images\/zack_sink.jpg"}]}';die;
               
        
        $dbAdapter      =   Zend_Db_Table::getDefaultAdapter();
                
        $sql = "SELECT id, title, image, CONCAT('http://www.society.local/assets/themes_preview/',type,'/',folder,'/',image) AS image_url, thumb, CONCAT('http://www.society.local/assets/themes_preview/',type,'/',folder,'/',thumb) AS thumb_url, IF(`default`>0,'checked=\'checked\'','') AS default_checked FROM themes ";      
        $result= $dbAdapter->fetchAll($sql);
        
        echo json_encode(array('themes' => $result ));
        die;
        $dir = $_SERVER['DOCUMENT_ROOT']."/assets/js/ExtJs/plugins/themes/images/thumbs/";
        $images = array();
        $d = dir($dir);
        while($name = $d->read()){
            if(!preg_match('/\.(jpg|gif|png)$/', $name)) continue;
            $size = filesize($dir.$name);
            $lastmod = filemtime($dir.$name)*1000;
            $images[] = array('name'=>$name, 'size'=>$size,
        			'lastmod'=>$lastmod, 'url'=>"http://www.society.local/assets/js/ExtJs/plugins/themes/images/thumbs/".$name);
        }
        $d->close();
        $o = array('images'=>$images);
        echo json_encode($o);
    }
    
    public function selectthemeAction()
    {
        $this->getHelper('layout')->disableLayout();  
        $this->_helper->viewRenderer->setNoRender(true);
        
        $dbAdapter          =   Zend_Db_Table::getDefaultAdapter();
        
        $insdata            =   array();        
        $insdata['default'] =   0; 
        $dbAdapter->update('themes', $insdata);
        unset($insdata);
                
        $insdata            =   array();        
        $insdata['default'] =   1;
        $where  =   "id = '".$_REQUEST['id']."'";
        $dbAdapter->update('themes', $insdata , $where);
        
        
        echo "{
                'success': true,
                'msg': 'Form submission complete.'
            }";
                            
        die; 
    }        


}

