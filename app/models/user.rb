class User < ActiveRecord::Base
  devise :database_authenticatable,
         :recoverable, :rememberable, :trackable, :validatable
  has_one :profile, dependent: :destroy
  has_many :workout_times, dependent: :destroy
  has_many :measurements, dependent: :destroy
  validates_presence_of :first_name, :last_name
  validates :workflow_state, inclusion: {in: %w(active inactive)}

  before_validation(on: :create) do
    password = SecureRandom.hex(10)
    self.password = password
  end

  after_create :send_creation_email, :create_profile

  def send_creation_email
    raw_token, hashed_token = Devise.token_generator.generate(User, :reset_password_token)
    self.reset_password_token = hashed_token
    self.reset_password_sent_at = Time.now.utc
    self.save
    self.update(reset_password_token: hashed_token, reset_password_sent_at: Time.now.utc)
    UserMailer.delay.send_user_creation_notification(self, raw_token)
  end

  def name
    "#{first_name} #{last_name}"
  end

  def total_workouts
    self.workout_times.count
  end

  def self.calculate_revenue
    ActionController::Base.helpers.number_to_currency(User.where('admin = ? and workflow_state = ?', false, 'active').count * 8.99)
  end

  private
    def create_profile
      self.profile = Profile.create
    end
end
