import cv2
import asyncio
from moviepy import VideoFileClip, AudioFileClip  # Corrected import
from pathlib import Path


async def create_video_from_images(image_folder: str, output_video_path: str, fps: int = 24):
    """
    Asynchronously creates a video from a folder of images.

    :param image_folder: Path to the folder containing images.
    :param output_video_path: Path to save the output video file.
    :param fps: Frames per second for the video.
    :return: Path to the created video file.
    """
    def process_images():
        # Get a sorted list of images
        image_files = sorted(Path(image_folder).glob("*.png")) + sorted(Path(image_folder).glob("*.jpg"))
        if not image_files:
            raise ValueError("No image files found in the folder.")

        # Read the first image to determine dimensions
        first_image = cv2.imread(str(image_files[0]))
        height, width, _ = first_image.shape

        fourcc = cv2.VideoWriter.fourcc(*'mp4v')  # Corrected FOURCC call
        video_writer = cv2.VideoWriter(output_video_path, fourcc, fps, (width, height))

        # Process each image
        for image_file in image_files:
            image = cv2.imread(str(image_file))
            if image.shape[:2] != (height, width):
                image = cv2.resize(image, (width, height))
            video_writer.write(image)

        video_writer.release()

    await asyncio.to_thread(process_images)  # Run the image processing in a separate thread
    print(f"Video created successfully at {output_video_path}")


async def add_music_to_video(video_path: str, audio_path: str, output_path: str):
    """
    Asynchronously adds music to a video file.

    :param video_path: Path to the video file.
    :param audio_path: Path to the audio file.
    :param output_path: Path to save the output video with music.
    """
    def process_audio_video():
        video_clip = VideoFileClip(video_path)
        audio_clip = AudioFileClip(audio_path)
        video_with_audio = video_clip.with_audio(audio_clip)  # Fixed to set_audio
        video_with_audio.write_videofile(output_path, codec="libx264", audio_codec="aac")

    await asyncio.to_thread(process_audio_video)  # Run the moviepy processing in a separate thread
    print(f"Video with music saved at {output_path}")


async def main():
    """
    Main asynchronous function to create video from images and add music to it.
    """
    image_folder = "./images"  # Replace with your image folder
    temp_video_path = "temp_video.mp4"  # Temporary video file
    final_video_path = "final_video_with_music.mp4"  # Final video with music
    audio_file_path = "./audio/audio_1.mp3"  # Replace with your audio file

    # Create the video from images
    try:
        await create_video_from_images(image_folder, temp_video_path, fps=1)
        # Add music to the video
        await add_music_to_video(temp_video_path, audio_file_path, final_video_path)
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    asyncio.run(main())
