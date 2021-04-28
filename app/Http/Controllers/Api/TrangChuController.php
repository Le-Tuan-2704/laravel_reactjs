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
        $datas = Websites::get();
        $showDatas = array();
        foreach ($datas as $data) {
            if ($data->status == 1) {
                array_push($showDatas, $data);
            }
        }

        foreach ($showDatas as $showData) {
            $url = "https://" . $showData->url;

            $curl = curl_init($url);
            curl_setopt($curl, CURLOPT_NOBODY, true);
            $result = curl_exec($curl);
            if ($result) {
                $isActive = 1;
            } else {
                $isActive = 0;
            }
            $update = array("isactive" => $isActive);
            try {
                // create the API client instance
                $client = new \Pdfcrowd\HtmlToImageClient("LeTuan", "792b3d5fbeec84294d86ff0ad4ea7dc6");

                // configure the conversion
                $client->setOutputFormat("png");
                $client->setScreenshotHeight(768);
                $img = 'img/' . $showData->id . '.png';
                $client->convertUrlToFile($url, $img);
                // run the conversion and store the result into the "image" variable
                //update
                $update["image"] = $img;
            } catch (\Pdfcrowd\Error $why) {

                $data = Websites::find($showData->id);
                $data->update($update);
                // send the error in the HTTP response
                return response($why->getMessage(), $why->getCode())
                    ->header("Content-Type", "text/plain");
            }
            $data = Websites::find($showData->id);
            $data->update($update);
        }

        return "ok";
    }
}