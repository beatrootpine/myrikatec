import { Link } from 'react-router-dom'
import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

export default function ClaimsPage() {
  const [submitted, setSubmitted] = useState(false)
  
  // Meals
  const [meals, setMeals] = useState({ days: '', description: '', date: '' })
  const mealsCap = 350
  const mealsClaim = meals.days ? parseInt(meals.days) * mealsCap : 0

  // Travel
  const [travel, setTravel] = useState({ km: '', description: '', date: '' })
  const travelRate = 4.84
  const travelClaim = travel.km ? parseFloat(travel.km) * travelRate : 0

  // Accommodation
  const [accommodation, setAccommodation] = useState({ nights: '', description: '', date: '' })
  const accommodationCap = 1200
  const accommodationClaim = accommodation.nights ? parseInt(accommodation.nights) * accommodationCap : 0

  const totalClaim = mealsClaim + travelClaim + accommodationClaim

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setMeals({ days: '', description: '', date: '' })
      setTravel({ km: '', description: '', date: '' })
      setAccommodation({ nights: '', description: '', date: '' })
    }, 2000)
  }

  return (
    <div className="flex h-screen bg-slate-950">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Submit Expense Claims" />
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-4xl">
            {submitted && (
              <div className="mb-6 bg-green-900/20 border border-green-700 rounded-lg p-4 text-green-300">
                ✓ Claims submitted successfully! Total: R{totalClaim.toFixed(2)}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* MEALS */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Meal Claims</h2>
                    <p className="text-slate-400 text-sm">R{mealsCap} per day</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-orange-600">R{mealsClaim.toFixed(2)}</p>
                    <p className="text-xs text-slate-400">Cap: R{(meals.days ? Math.min(mealsClaim, mealsCap * 31) : 0).toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Number of Days</label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number"
                        min="0"
                        value={meals.days}
                        onChange={e => setMeals({...meals, days: e.target.value})}
                        placeholder="e.g., 5"
                        className="w-32 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                      />
                      <span className="text-slate-400">days × R{mealsCap}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Description</label>
                    <input 
                      type="text"
                      value={meals.description}
                      onChange={e => setMeals({...meals, description: e.target.value})}
                      placeholder="e.g., Client lunch meeting"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Date</label>
                    <input 
                      type="date"
                      value={meals.date}
                      onChange={e => setMeals({...meals, date: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* TRAVEL */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Travel - Mileage</h2>
                    <p className="text-slate-400 text-sm">R{travelRate} per km</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-orange-600">R{travelClaim.toFixed(2)}</p>
                    <p className="text-xs text-slate-400">{travel.km ? parseFloat(travel.km).toFixed(0) : 0} km claimed</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Kilometers Travelled</label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number"
                        step="0.1"
                        min="0"
                        value={travel.km}
                        onChange={e => setTravel({...travel, km: e.target.value})}
                        placeholder="e.g., 125.5"
                        className="w-40 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                      />
                      <span className="text-slate-400">km × R{travelRate}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Trip Description</label>
                    <input 
                      type="text"
                      value={travel.description}
                      onChange={e => setTravel({...travel, description: e.target.value})}
                      placeholder="e.g., Johannesburg to Pretoria - Client visit"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Date</label>
                    <input 
                      type="date"
                      value={travel.date}
                      onChange={e => setTravel({...travel, date: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* ACCOMMODATION */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-white">Accommodation</h2>
                    <p className="text-slate-400 text-sm">R{accommodationCap} per night</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-orange-600">R{accommodationClaim.toFixed(2)}</p>
                    <p className="text-xs text-slate-400">{accommodation.nights ? parseInt(accommodation.nights) : 0} nights</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Number of Nights</label>
                    <div className="flex items-center space-x-2">
                      <input 
                        type="number"
                        min="0"
                        value={accommodation.nights}
                        onChange={e => setAccommodation({...accommodation, nights: e.target.value})}
                        placeholder="e.g., 2"
                        className="w-32 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                      />
                      <span className="text-slate-400">nights × R{accommodationCap}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Location/Hotel</label>
                    <input 
                      type="text"
                      value={accommodation.description}
                      onChange={e => setAccommodation({...accommodation, description: e.target.value})}
                      placeholder="e.g., Sandton Hotel, Johannesburg"
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-200 mb-2">Check-in Date</label>
                    <input 
                      type="date"
                      value={accommodation.date}
                      onChange={e => setAccommodation({...accommodation, date: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:border-orange-600 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* TOTAL */}
              <div className="bg-gradient-to-r from-orange-900/30 to-orange-900/10 border border-orange-800 rounded-xl p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-slate-300 text-lg">Total Claim Amount</p>
                    <p className="text-sm text-slate-400 mt-1">Meals + Travel + Accommodation</p>
                  </div>
                  <div className="text-right">
                    <p className="text-5xl font-bold text-orange-500">R{totalClaim.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={totalClaim === 0}
                className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold text-lg transition-all"
              >
                {totalClaim > 0 ? `Submit Claims - R${totalClaim.toFixed(2)}` : 'Enter at least one claim'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
