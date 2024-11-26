import ytdl from "@distube/ytdl-core";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const url = searchParams.get("url");

        if (!url) {
            return NextResponse.json({ error: "URL parameter is missing" }, { status: 400 });
        }

        console.log("Fetching video info for URL:", url);

        const info = await ytdl.getInfo(url);
        console.log("Video info fetched:", info);
        if (!info.formats || info.formats.length === 0) {
            return NextResponse.json({ error: "No formats found for this video." }, { status: 404 });
        }

        console.log('Available formats:', info.formats);

        const videoFormat = ytdl.filterFormats(info.formats, 'video');
        const format = ytdl.chooseFormat(videoFormat, { quality: 'highestvideo' });

        const fileName = `${info.videoDetails.title}.${format.container}`;

        const responseHeaders = { 'content-Disposition': `attachment; filename="${fileName}"` };

        return NextResponse.json({ format, responseHeaders, fileName });
    } catch (error) {
        console.error('Error fetching video info:', error);
        return NextResponse.json({ error: 'Failed to fetch video info' }, { status: 500 });
    }
}

