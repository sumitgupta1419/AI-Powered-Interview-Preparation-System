import { useEffect, useState } from "react";

import { getProfile } from "../services/profileService";

import ProfileCard from "../components/profile/ProfileCard";
import StatisticsCard from "../components/profile/StatisticsCard";
import AchievementCard from "../components/profile/AchievementCard";
import RecentActivity from "../components/profile/RecentActivity";

function Profile() {

  const [profileData, setProfileData] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {

    try {

      const data = await getProfile();

      if (data.success) {

        setProfileData(data);

      }

    } catch (error) {

      console.error(error);

      alert("Unable to load profile.");

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white text-2xl">
        Loading Profile...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-[#020617] text-white py-12 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-center mb-12">

          👤 My Profile

        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          <div>

            <ProfileCard
              user={profileData.user}
              refreshProfile={fetchProfile}
            />

          </div>

          <div className="lg:col-span-2">

            <StatisticsCard
              statistics={profileData.statistics}
            />

          </div>

        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">

          <AchievementCard
            achievements={profileData.achievements}
          />

          <RecentActivity
            activities={profileData.recentActivity}
          />

        </div>

      </div>

    </div>

  );

}

export default Profile;