<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Websites;
use Illuminate\Http\Request;

class TrangChuController extends Controller
{
    public function index()
    {
        $datas = Websites::get();
        $showDatas = array();
        foreach ($datas as $data) {
            if ($data->status == 1) {
                $date = date_create($data->updated_at);
                $data->date = date_format($date, "Y/m/d H:i:s");
                array_push($showDatas, $data);
            }
        }

        $dataCheckUrlOK = array();
        $dataCheckUrlError = array();
        foreach ($showDatas as $showData) {
            if ($showData->isactive) {
                array_push($dataCheckUrlOK, $showData);
            } else {
                array_push($dataCheckUrlError, $showData);
            }
        }

        return response()->json([
            "dataOk" => $dataCheckUrlOK,
            "dataError" => $dataCheckUrlError,
            "message" => "thanh cong"
        ], 200);
    }

    public function checkWebsites()
    {
        $url = "http://www.dodacphumy.com";
        // http: //www.dodacphumy.com/
        $file_headers = @get_headers($url);

        dd($file_headers);

        $datas = Websites::get();
        $showDatas = array();
        foreach ($datas as $data) {
            if ($data->status == 1) {
                array_push($showDatas, $data);
            }
        }

        foreach ($showDatas as $showData) {
            // $url = "https://" . $showData->url;

            // $curl = curl_init($url);
            // curl_setopt($curl, CURLOPT_NOBODY, true);
            // $result = curl_exec($curl);
            // return ($result);
            // if ($result) {
            //     $isActive = 1;
            // } else {
            //     $isActive = 0;
            // }

            $url = $showData->url;
            $file_headers = @get_headers($url);

            if (!$file_headers || $file_headers[0] == 'HTTP/1.1 404 Not Found') {
                $isActive = 0;
            } else {
                $isActive = 1;
            }

            $update = array("isactive" => $isActive);
            $data = Websites::find($showData->id);
            try {
                // create the API client instance
                $client = new \Pdfcrowd\HtmlToImageClient("demo", "ce544b6ea52a5621fb9d55f8b542d14d");

                // configure the conversion
                $client->setOutputFormat("png");
                $client->setScreenshotHeight(768);
                $img = 'img/' . $showData->id . '.png';
                $client->convertUrlToFile($url, asset($img));
                error_log($img);
                $update["image"] = $img;
            } catch (\Pdfcrowd\Error $why) {
                error_log("Pdfcrowd Error: {$why}\n");
                error_log("anh loi: " . $img);
                // send the error in the HTTP response
            }
            $data->update($update);
        }

        return "ok";
    }
}