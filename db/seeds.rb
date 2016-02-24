# Days Of The Week
%w(Sunday Monday Tuesday Wednesday Thursday Friday Saturday).each_with_index do |day, index|
  Day.create(id: index, name: day)
end
puts "Days Seeded."

# Moves
air_squat = Move.create(name: 'Air Squat', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/g_Rby4uS3bU" frameborder="0" allowfullscreen></iframe>')
burpee = Move.create(name: 'Burpee', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/iGzGd770wyk" frameborder="0" allowfullscreen></iframe>')
situp = Move.create(name: 'Situp', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/PH6p0Iyu8eE" frameborder="0" allowfullscreen></iframe>')
push_up = Move.create(name: 'Push Up', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/yutEjZrd1jQ" frameborder="0" allowfullscreen></iframe>')
plank_hold = Move.create(name: 'Plank Hold', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/PmsxHwUSB8M" frameborder="0" allowfullscreen></iframe>')
mountain_climbers = Move.create(name: 'Mountain Climbers', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/HpkhSzCvh0c" frameborder="0" allowfullscreen></iframe>')
lunge = Move.create(name: 'Lunge', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/hwMuw1KTWWI" frameborder="0" allowfullscreen></iframe>')
db_shoulder_press = Move.create(name: 'DB Shoulder Press', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/X079zuXwVeU" frameborder="0" allowfullscreen></iframe>')
db_curls = Move.create(name: 'DB Curls', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/_V2h8XHsjuY" frameborder="0" allowfullscreen></iframe>')
jump_squats = Move.create(name: 'Jump Squats', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/Bu-mwG3HIy8" frameborder="0" allowfullscreen></iframe>')
wide_push_ups = Move.create(name: 'Wide Push Ups', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/p9Bo28xLg1c" frameborder="0" allowfullscreen></iframe>')
alt_plank = Move.create(name: 'ALT Plank', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/RsLitGK9tNY" frameborder="0" allowfullscreen></iframe>')
bent_over_row = Move.create(name: 'Bent Over Rows', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/8Yx70POxYRM" frameborder="0" allowfullscreen></iframe>')
speed_jacks = Move.create(name: 'Speed Jacks', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/ZBC_U1ohG2o" frameborder="0" allowfullscreen></iframe>')
squat_jacks = Move.create(name: 'Squat Jacks', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/DqJB8HneVbI" frameborder="0" allowfullscreen></iframe>')
suicide = Move.create(name: 'Suicides', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/rWcWbPs2u-8" frameborder="0" allowfullscreen></iframe>')
the_dip = Move.create(name: 'The Dip', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/E-KuVYFtMfU" frameborder="0" allowfullscreen></iframe>')
seated_knee_tucks = Move.create(name: 'Seated Knee Tucks', url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/apni0oE5Xuc" frameborder="0" allowfullscreen></iframe>')
puts "Moves Seeded."

# Trainers
shayne = Trainer.create(name: 'Shayne Scruggs', intro_video_url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/aCewnjtoKGQ" frameborder="0" allowfullscreen></iframe>')
amy = Trainer.create(name: 'Amy Anderson', intro_video_url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/zDOWA5u3Mk4" frameborder="0" allowfullscreen></iframe>')
parker = Trainer.create(name: 'Parker Morgan', intro_video_url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/2eQlGKJl_2Y" frameborder="0" allowfullscreen></iframe>')
jessie = Trainer.create(name: 'Jessie Drage', intro_video_url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/BnvqSJI3WCY" frameborder="0" allowfullscreen></iframe>')
puts "Trainers Seeded."

# Motivation
Motivation.create(text: 'Keep Going, You Got This!')

# O.Zone Challenge
ozone_challenge = Workout.create(name: 'O.Zone Challenge', min_time: 160, ozf_time: 300, rounds: 1)
ozone_challenge.workout_moves << WorkoutMove.create(move_id: situp.id, reps: 40)
ozone_challenge.workout_moves << WorkoutMove.create(move_id: air_squat.id, reps: 40)
ozone_challenge.workout_moves << WorkoutMove.create(move_id: push_up.id, reps: 40)
ozone_challenge.workout_moves << WorkoutMove.create(move_id: burpee.id, reps: 25)
puts "O.Zone Challenge Seeded."

Nutrition.create(embedUrl: 'https://drive.google.com/file/d/0B5y12SEGcUymNV8wVTJjdy13Vzg/preview')
Nutrition.create(embedUrl: 'https://drive.google.com/file/d/0B5y12SEGcUymc2tGVnpkc1RneEk/preview')
Nutrition.create(embedUrl: 'https://drive.google.com/file/d/0B5y12SEGcUymUnBsMFJhT2cxN1E/preview')
puts "Nutritions Seeded."