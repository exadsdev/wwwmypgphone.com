import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const SETTINGS_FILE = path.join(DATA_DIR, 'settings.json');

export async function GET() {
    try {
        const data = await fs.readFile(SETTINGS_FILE, 'utf8');
        return NextResponse.json(JSON.parse(data));
    } catch (error) {
        console.error('Error reading settings:', error);
        // Return default if file not found or error
        return NextResponse.json({ googleTagId: '', shopUrl: '' });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Load existing settings first to preserve other fields if any
        let settings = { googleTagId: '', shopUrl: '' };
        try {
            const data = await fs.readFile(SETTINGS_FILE, 'utf8');
            settings = JSON.parse(data);
        } catch (e) {
            // New file will be created
        }

        // Update fields
        if (body.googleTagId !== undefined) settings.googleTagId = body.googleTagId;
        if (body.shopUrl !== undefined) settings.shopUrl = body.shopUrl;

        // Ensure directory exists
        await fs.mkdir(DATA_DIR, { recursive: true });

        // Write back
        await fs.writeFile(SETTINGS_FILE, JSON.stringify(settings, null, 2), 'utf8');

        return NextResponse.json({ success: true, settings });
    } catch (error) {
        console.error('Error saving settings:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to save settings: ' + error.message },
            { status: 500 }
        );
    }
}
