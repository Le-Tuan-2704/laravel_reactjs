<?php

namespace App\Console\Commands;

use App\Models\Websites;
use Illuminate\Console\Command;

class CheckWebsize extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'checkwebsize:cron';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {

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
                $client->convertUrlToFile($url, 'public/' . $img);
                error_log($img);
                $update["image"] = $img;
            } catch (\Pdfcrowd\Error $why) {
                error_log("Pdfcrowd Error: {$why}\n");
                error_log("anh loi: " . $img);
                // send the error in the HTTP response
            }
            $data->update($update);
        }
    }
}