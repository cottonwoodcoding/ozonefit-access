class Api::V1::SoundCloudsController < ApiController
  before_action :sound_cloud, except: [:index, :create, :random]
  
  def index
    @sound_clouds = SoundCloud.all
  end

  def create
    @sound_cloud = SoundCloud.new(sound_cloud_params)
    if @sound_cloud.save
      render :sound_cloud
    else
      render json: {errors: @sound_cloud.errors.full_messages}
    end
  end

  def update
    if @sound_cloud.update(sound_cloud_params)
      render :sound_cloud
    else
      render json: {errors: @sound_cloud.errors.full_messages}
    end
  end

  def destroy
    @sound_cloud.destroy
    head :ok
  end

  def random
    @random = SoundCloud.all.sample
    render json: {url: @random.url}
  end

  private
    def sound_cloud_params
      params.require(:sound_cloud).permit(:name, :url)
    end

    def sound_cloud
      @sound_cloud = SoundCloud.find(params[:id])
    end
end
